/**
 * Verifica INDICE.md de slides vs subcadenas en workshop.config.json.
 * Ejecutar desde claw-content-bot: npm run verify:slides
 */
const fs = require('fs');
const path = require('path');

const botDir = path.join(__dirname, '..');
const configPath = path.join(botDir, 'workshop.config.json');
const wsRoot = path.resolve(botDir, '..');

const cfg = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const slidesCfg = cfg.slides_asset || {};
const rel =
  slidesCfg.relative_path_from_workspace_root ||
  'taller-mayo-2026/slides/INDICE.md';
const indicePath = path.join(wsRoot, rel);

if (!fs.existsSync(indicePath)) {
  console.error('[verify:slides] Falta:', indicePath);
  process.exit(2);
}

const md = fs.readFileSync(indicePath, 'utf8');
const needed =
  slidesCfg.must_contain_substrings ||
  cfg.tiers.map((t) => String(t.price_amount));

let ok = true;
for (const sub of needed) {
  if (!md.includes(sub)) {
    console.error(`[verify:slides] INDICE sin "${sub}"`);
    ok = false;
  }
}

if (ok) {
  console.log('[verify:slides] OK —', rel);
}

process.exit(ok ? 0 : 1);

