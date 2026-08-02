import { readdir, readFile, access } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const roots = ['src', 'public'];
const checked = new Set();
const missing = [];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await walk(path);
    else if (/\.(astro|ts|md|html|css)$/.test(entry.name)) await scan(path);
  }
}

async function scan(path) {
  const text = await readFile(path, 'utf8');
  for (const match of text.matchAll(/(?:src|poster|cover):?\s*["']?(\/media\/[^"'\s}\]]+)/g)) {
    const url = match[1].replace(/[),]$/, '');
    if (checked.has(url)) continue;
    checked.add(url);
    try { await access(resolve('public', url.slice(1))); }
    catch { missing.push(`${path}: ${url}`); }
  }
}

for (const root of roots) await walk(root);
if (missing.length) {
  console.error('Missing media files:\n' + missing.join('\n'));
  process.exit(1);
}
console.log(`Media check passed: ${checked.size} referenced files found.`);
