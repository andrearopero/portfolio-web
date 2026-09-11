#!/usr/bin/env node
// Pre-publication placeholder gate (portfolio-content spec).
//
// Scans the source tree for `TODO-URL-*` markers — the convention for any
// profile link that is NOT user-confirmed. Fails with a file list while any
// marker remains, so unconfirmed links can never reach publication. Zero
// dependencies, Node >= 18. Read-only walker with fixed paths.

import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';

// Directories scanned for placeholder markers.
const SCAN_DIRS = ['src', 'scripts', 'docs'];

const MARKER_RE = /TODO-URL-[A-Z0-9_-]+/g;

const TEXT_EXTENSIONS = new Set([
  '.ts',
  '.tsx',
  '.js',
  '.mjs',
  '.md',
  '.mdx',
  '.css',
  '.json',
]);

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

async function dirExists(dir) {
  try {
    return (await stat(dir)).isDirectory();
  } catch {
    return false;
  }
}

async function main() {
  const findings = [];
  let scanned = 0;

  for (const dir of SCAN_DIRS) {
    if (!(await dirExists(dir))) continue;
    for await (const path of walk(dir)) {
      const ext = path.slice(path.lastIndexOf('.')).toLowerCase();
      if (!TEXT_EXTENSIONS.has(ext)) continue;
      scanned += 1;
      let content;
      try {
        content = await readFile(path, 'utf8');
      } catch (error) {
        // Fail closed: an unreadable file blocks publication.
        console.error(`PLACEHOLDER CHECK ERROR: cannot read ${path}: ${error.message}`);
        process.exit(1);
      }
      for (const match of content.matchAll(MARKER_RE)) {
        const line = content.slice(0, match.index).split('\n').length;
        findings.push({ relPath: relative('.', path), line, marker: match[0] });
      }
    }
  }

  if (findings.length > 0) {
    console.error('PLACEHOLDER CHECK FAILED — unconfirmed link markers remain:');
    for (const finding of findings) {
      console.error(`  ${finding.relPath}:${finding.line}  ${finding.marker}`);
    }
    console.error(`Publication blocked: resolve every TODO-URL marker first (${scanned} files scanned).`);
    process.exit(1);
  }

  console.log(`PLACEHOLDER CHECK PASS — no TODO-URL markers (${scanned} files scanned).`);
}

main();
