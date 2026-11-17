// Lists German texts (t('...')) and motifs that have no translation yet,
// and translations whose German source no longer exists in the code.
// Usage: npm run i18n:check
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname, basename } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const src = join(root, 'src');

function files(dir) {
  return readdirSync(dir).flatMap(f => {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) return f === 'locales' ? [] : files(p);
    return ['.js', '.jsx'].includes(extname(p)) ? [p] : [];
  });
}

// Matches t('...') / t("...") with a string literal as first argument.
const re = /\bt\(\s*(['"])((?:\\.|(?!\1).)*)\1/g;
const used = new Set();
for (const f of files(src)) {
  for (const m of readFileSync(f, 'utf8').replace(/^\s*\/\/.*$/gm, '').matchAll(re)) {
    used.add(m[2].replace(/\\(['"\\])/g, '$1'));
  }
}

const motifIds = JSON.parse(readFileSync(join(root, 'public/motifs.json'), 'utf8')).map(m => m.id);

let problems = 0;
for (const file of readdirSync(join(src, 'locales'))) {
  const lang = basename(file, extname(file));
  const { default: dict } = await import(join(src, 'locales', file));
  const strings = dict.strings || {};
  const motifs = dict.motifs || {};

  const missing = [...used].filter(k => !(k in strings));
  const unused = Object.keys(strings).filter(k => !used.has(k));
  const missingMotifs = motifIds.filter(id => !motifs[id]?.title || !motifs[id]?.subtitle);
  const unusedMotifs = Object.keys(motifs).filter(id => !motifIds.includes(id));

  console.log(`\n[${lang}] ${used.size - missing.length}/${used.size} texts, ${motifIds.length - missingMotifs.length}/${motifIds.length} motifs translated`);
  const list = (title, items) => {
    if (!items.length) return;
    console.log(`  ${title}:`);
    items.forEach(i => console.log(`    - ${JSON.stringify(i)}`));
  };
  list('Missing translations (shown in German)', missing);
  list('Missing motif translations (id in public/motifs.json)', missingMotifs);
  list('Unused translations (German text changed or removed?)', unused);
  list('Unused motif translations (motif id no longer exists)', unusedMotifs);
  problems += missing.length + missingMotifs.length;
}
process.exitCode = problems ? 1 : 0;
