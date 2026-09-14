#!/usr/bin/env node
// Build-time privacy gate (portfolio-privacy spec).
//
// Walks dist/** and fails (exit 1, naming file + match) on any prohibited
// string: the professor reference-block tokens and email, the reference
// phone number, the personal email, the CV filename, and any CV download
// control. Zero dependencies, Node >= 18. This script is a read-only walker
// with fixed paths: no user input, no shell composition (threat matrix:
// build scripts).
//
// Privacy amendment 2026-09-11 (REVOKED 2026-09-14): the professional phone
// +57 322 799 9411 was briefly an approved secondary channel and its needles
// were removed; the user's binding decision now PROHIBITS publishing the
// personal number, so the phone needles are restored. The peer-reviewed
// publication legitimately contains the author names that share tokens with
// the reference block ("Bru", "Cordero", "Osnamir", "Elias"); those author
// name needles stay removed (no match against legitimate publication text).
//
// S3 completion: the cédula, birth date/place, and residential address
// needles were absent from the original file; the amended portfolio-privacy
// spec requires every non-approved PII class to hard-fail the build, so they
// are explicit needles now (verified: none of these tokens occur in
// legitimate site content — see scripts/test-privacy-gates.mjs).

import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';

const DIST_DIR = 'dist';

// Text file extensions scanned for prohibited strings. Binary assets
// (fonts, images) are skipped: prohibited content only reaches dist through
// text produced by this site's own build.
const TEXT_EXTENSIONS = new Set([
  '.html',
  '.css',
  '.js',
  '.mjs',
  '.json',
  '.svg',
  '.xml',
  '.txt',
  '.map',
  '.webmanifest',
]);

// Prohibited needles. `norm` needles run against a copy of the content with
// spaces and dashes removed, so de-spaced / de-dashed phone variants are
// caught too.
const NEEDLES = [
  // Reference block (professor references from the CV) — hard-protected.
  { label: 'reference email "oebruc@unal.edu.co"', re: /oebruc@unal\.edu\.co/i },
  { label: 'reference phone "(+57) 316 5000"', re: /\(\s*\+57\s*\)[\s-]*316[\s-]*5000/i },
  { label: 'reference phone "316 5000"', re: /316[\s-]*5000/ },
  { label: 'reference phone de-spaced "3165000"', norm: '3165000' },
  // Personal identity data.
  { label: 'personal email "andrearopero1520@gmail.com"', re: /andrearopero1520@gmail\.com/i },
  { label: 'personal phone "322 799 9411"', re: /322[\s-]*799[\s-]*9411/ },
  { label: 'personal phone de-spaced "3227999411"', norm: '3227999411' },
  { label: 'cédula "1003239904"', re: /1003239904/ },
  { label: 'birth date "2003-04-15"', re: /2003\s*[-/.]\s*04\s*[-/.]\s*15/ },
  { label: 'birth date de-dashed "20030415"', norm: '20030415' },
  { label: 'birth place "VALLEDUPAR"', re: /valledupar/i },
  // Residential address.
  { label: 'address "calle #4-17"', re: /calle\s*#?\s*4\s*-\s*17/i },
  { label: 'address de-spaced "calle#417"', norm: 'calle#417' },
  { label: 'neighborhood "El Millón"', re: /el\s+mill[oó]n/i },
  { label: 'neighborhood "SAN DIEGO"', re: /san\s+diego/i },
  // CV file / download markers.
  { label: 'CV filename "HDV_AndreaRopero"', re: /HDV_AndreaRopero/ },
  { label: 'CV download control "Descargar CV"', re: /Descargar\s+CV/i },
];

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(path);
    } else {
      yield path;
    }
  }
}

function reportMatches(content, normalized, relPath) {
  const findings = [];
  for (const { label, re, norm } of NEEDLES) {
    if (re) {
      for (const match of content.matchAll(new RegExp(re.source, re.flags + 'g'))) {
        const line = content.slice(0, match.index).split('\n').length;
        findings.push({ relPath, line, label, excerpt: match[0] });
      }
    } else if (norm && normalized.includes(norm)) {
      const idx = normalized.indexOf(norm);
      const line = normalized.slice(0, idx).split('\n').length;
      findings.push({ relPath, line, label, excerpt: norm });
    }
  }
  return findings;
}

async function main() {
  let exists = false;
  try {
    exists = (await stat(DIST_DIR)).isDirectory();
  } catch {
    // stat throws when dist is missing.
  }
  if (!exists) {
    console.error(`PRIVACY SCAN ERROR: "${DIST_DIR}/" not found. Run the build first.`);
    process.exit(1);
  }

  let scanned = 0;
  let skippedBinary = 0;
  const findings = [];

  for await (const path of walk(DIST_DIR)) {
    const ext = path.slice(path.lastIndexOf('.')).toLowerCase();
    if (!TEXT_EXTENSIONS.has(ext)) {
      skippedBinary += 1;
      continue;
    }
    scanned += 1;
    let content;
    try {
      content = await readFile(path, 'utf8');
    } catch (error) {
      // Fail closed: an unreadable file blocks publication.
      console.error(`PRIVACY SCAN ERROR: cannot read ${path}: ${error.message}`);
      process.exit(1);
    }
    const normalized = content.replace(/[\s\u00A0-]/g, '');
    findings.push(...reportMatches(content, normalized, relative('.', path)));
  }

  if (findings.length > 0) {
    console.error('PRIVACY SCAN FAILED — prohibited content found:');
    for (const finding of findings) {
      console.error(`  ${finding.relPath}:${finding.line}  [${finding.label}]  "${finding.excerpt}"`);
    }
    console.error(`Publication blocked: ${findings.length} match(es) in dist/.`);
    process.exit(1);
  }

  console.log(`PRIVACY SCAN PASS — 0 prohibited matches (${scanned} files scanned, ${skippedBinary} binary skipped).`);
}

main();
