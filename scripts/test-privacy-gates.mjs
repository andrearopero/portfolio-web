#!/usr/bin/env node
// RED/GREEN fixture test for the publication gates (portfolio-privacy spec,
// task 3.1 "Other PII still hard-fails" / "Placeholder blocks publish").
//
// Builds throwaway dist-like fixtures in a temp directory and proves:
//   RED  — every prohibited PII class makes scan-privacy.mjs exit 1
//          (reference block, personal email, personal phone, cédula, birth
//          data, address, CV markers) and a TODO-URL marker makes
//          check-placeholders.mjs exit 1;
//   GREEN — a fixture carrying the APPROVED content (the publication author
//          list, which shares tokens with the reference block) exits 0: no
//          false positives.
//
// Zero dependencies, Node >= 18. Fixture dirs live in os.tmpdir() and are
// always removed; the real dist/ is never touched. Read-only with respect
// to the repository.

import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const SCAN_PRIVACY = join(scriptDir, 'scan-privacy.mjs');
const CHECK_PLACEHOLDERS = join(scriptDir, 'check-placeholders.mjs');

// One case per prohibited PII class. Each gets its own fake dist/ so a
// single bad needle can never mask another.
const RED_CASES = [
  { label: 'reference email "oebruc@unal.edu.co"', content: 'Referencias: oebruc@unal.edu.co' },
  { label: 'reference phone "(+57) 316 5000"', content: 'Ref: (+57) 316 5000' },
  { label: 'reference phone "316 5000"', content: 'tel ref 316 5000' },
  { label: 'reference phone de-spaced "3165000"', content: 'id 3165000' },
  { label: 'personal email "andrearopero1520@gmail.com"', content: 'mail: andrearopero1520@gmail.com' },
  // Privacy decision 2026-09-14: the personal phone is prohibited again
  // (its 2026-09-11 "approved channel" amendment was revoked), so both
  // written variants are RED cases now.
  {
    label: 'personal phone "322 799 9411"',
    content: 'Teléfono profesional: +57 322 799 9411',
  },
  {
    label: 'personal phone tel link "tel:+573227999411"',
    content: '<a href="tel:+573227999411">Llamar</a>',
  },
  { label: 'cédula "1003239904"', content: 'CC 1003239904' },

  { label: 'birth date "2003-04-15"', content: 'nacimiento 2003-04-15' },
  { label: 'birth place "VALLEDUPAR"', content: 'ciudad: VALLEDUPAR' },
  { label: 'address "calle #4-17"', content: 'dirección: calle #4-17' },
  { label: 'address de-spaced "calle 4 17" variant', content: 'calle#417' },
  { label: 'neighborhood "El Millón"', content: 'barrio El Millón' },
  { label: 'neighborhood "SAN DIEGO"', content: 'barrio SAN DIEGO' },
  { label: 'CV filename "HDV_AndreaRopero.pdf"', content: '<a href="HDV_AndreaRopero.pdf">hoja de vida</a>' },
  { label: 'CV download control "Descargar CV"', content: '<button>Descargar CV</button>' },
];

// The placeholder gate gets its own case (it scans source dirs, not dist).
// The marker is assembled at runtime so this script itself never contains a
// literal TODO-URL marker — check-placeholders.mjs scans scripts/ too, and
// it proved exactly that by blocking this file during S3 verification.
const RED_PLACEHOLDER_CASE = {
  label: 'TODO-URL marker',
  content: `export const x = "TODO-URL-${'TEST'}";`,
};

// GREEN: approved content that MUST pass — the confirmed publication author
// list whose tokens were removed from the needle set. The personal phone is
// NOT green anymore (privacy decision 2026-09-14): it is covered by the RED
// cases above.
const GREEN_CONTENT = [
  'Osnamir Elias Bru-Cordero, Estefania Guillen-García, John Alexander Hernández-López,',
  'Andrea Carolina Ropero-Lozano y Enrique Correa-Álvarez.',
  'Ciencia en Desarrollo (UPTC) · Vol. 17, Núm. 1 · 2026.',
].join('\n');

function runGate(scriptPath, cwd) {
  return spawnSync(process.execPath, [scriptPath], { cwd, encoding: 'utf8' });
}

async function withTempDist(content, fn) {
  const tmp = await mkdtemp(join(tmpdir(), 'privacy-gate-'));
  try {
    await mkdir(join(tmp, 'dist'));
    await writeFile(join(tmp, 'dist', 'dirty.html'), content, 'utf8');
    return await fn(tmp);
  } finally {
    await rm(tmp, { recursive: true, force: true });
  }
}

async function withTempSource(content, fn) {
  const tmp = await mkdtemp(join(tmpdir(), 'placeholder-gate-'));
  try {
    await mkdir(join(tmp, 'scripts'));
    await writeFile(join(tmp, 'scripts', 'dirty.ts'), content, 'utf8');
    return await fn(tmp);
  } finally {
    await rm(tmp, { recursive: true, force: true });
  }
}

let failures = 0;

function report(ok, label, detail) {
  if (ok) {
    console.log(`  PASS  ${label}${detail ? ` — ${detail}` : ''}`);
  } else {
    failures += 1;
    console.error(`  FAIL  ${label}${detail ? ` — ${detail}` : ''}`);
  }
}

console.log('RED — prohibited PII must hard-fail scan-privacy.mjs:');
for (const testCase of RED_CASES) {
  await withTempDist(testCase.content, (tmp) => {
    const result = runGate(SCAN_PRIVACY, tmp);
    const ok = result.status === 1;
    report(ok, testCase.label, ok ? 'exit 1' : `unexpected exit ${result.status}`);
  });
}

console.log('RED — TODO-URL marker must hard-fail check-placeholders.mjs:');
await withTempSource(RED_PLACEHOLDER_CASE.content, (tmp) => {
  const result = runGate(CHECK_PLACEHOLDERS, tmp);
  report(result.status === 1, RED_PLACEHOLDER_CASE.label, `exit ${result.status}`);
});

console.log('GREEN — approved publication author list must pass:');
await withTempDist(GREEN_CONTENT, (tmp) => {
  const result = runGate(SCAN_PRIVACY, tmp);
  report(result.status === 0, 'approved phone + author list', `exit ${result.status}`);
});

if (failures > 0) {
  console.error(`PRIVACY GATE FIXTURE TEST FAILED — ${failures} case(s).`);
  process.exit(1);
}
console.log('PRIVACY GATE FIXTURE TEST PASS — all gates behave as specified.');
