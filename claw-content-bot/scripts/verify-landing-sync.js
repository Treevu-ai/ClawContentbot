/**
 * Verifica landing vs workshop.config.json (precios, fechas Mayo N, extras).
 * Ejecutar desde claw-content-bot: npm run verify:assets
 */
const fs = require('fs');
const path = require('path');

const botDir = path.join(__dirname, '..');
const configPath = path.join(botDir, 'workshop.config.json');
const wsRoot = path.resolve(botDir, '..');

const cfg = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const landingRel =
  cfg.landing_asset?.relative_path_from_workspace_root ||
  'taller-mayo-2026/landing/index.html';
const landingPath = path.join(wsRoot, landingRel);

if (!fs.existsSync(landingPath)) {
  console.error('[verify:landing] Falta:', landingPath);
  process.exit(2);
}

const html = fs.readFileSync(landingPath, 'utf8');
let ok = true;

function fail(msg) {
  console.error('[verify:landing]', msg);
  ok = false;
}

/* Precios USD */
for (const t of cfg.tiers) {
  const n = String(t.price_amount);
  if (!html.includes(n)) {
    fail(`Landing sin monto "${n}" (tier ${t.id}).`);
  }
}

/** Acepta "Mayo 7" o "7 de Mayo" como en index.html */
function landingHasMayoDay(html, dayNum) {
  const n = String(dayNum);
  return (
    html.includes(`Mayo ${n}`) ||
    html.includes(`${n} de Mayo`) ||
    html.includes(`${n} de mayo`)
  );
}

/* Días Mayo N desde welcome_session_lines */
if (cfg.landing_checks?.must_contain_session_dates !== false) {
  const dateRe = /Mayo\s+(\d{1,2})/g;
  for (const line of cfg.welcome_session_lines || []) {
    let m;
    const re = new RegExp(dateRe.source, 'g');
    while ((m = re.exec(line)) !== null) {
      const day = parseInt(m[1], 10);
      if (!landingHasMayoDay(html, day)) {
        fail(
          `Landing sin día Mayo ${day} (esperado "Mayo ${day}" o "${day} de Mayo").`
        );
      }
    }
  }
}

/* Subcadenas opcionales */
for (const sub of cfg.landing_checks?.extra_substrings || []) {
  if (!html.includes(sub)) {
    fail(`Landing sin texto requerido "${sub}".`);
  }
}

if (ok) {
  console.log('[verify:landing] OK —', landingRel);
}

process.exit(ok ? 0 : 1);
