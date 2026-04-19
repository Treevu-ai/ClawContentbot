const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, 'workshop.config.json');

function loadWorkshopConfig() {
  const raw = fs.readFileSync(CONFIG_PATH, 'utf8');
  return JSON.parse(raw);
}

function buildWelcomeBase(cfg) {
  const sessions = cfg.welcome_session_lines.join('\n');
  const { time_range, timezone_label, platform } = cfg.schedule_footer;
  return `🎓 *${cfg.title}*

${cfg.tagline}

${sessions}

⏰ Hora: ${time_range} (${timezone_label})
📍 Plataforma: ${platform}

🛠️ Stack: ${cfg.stack_line}`;
}

function buildInfoMarkdown(cfg) {
  const info = cfg.info;
  const sessionBlock = info.sessions
    .map((s) => `${s.title_line}\n${s.detail}`)
    .join('\n\n');
  const stackBlock = info.stack_bullets.join('\n');
  const outcomesBlock = info.outcomes.join('\n');

  return `📋 *Info del Taller*

🎯 *${info.intro_heading}*

${sessionBlock}

🛠️ *${info.stack_heading}*
${stackBlock}

🎁 *${info.outcomes_heading}*
${outcomesBlock}

⏰ *Hora:* ${info.footer_time} (${info.footer_tz})
📍 *Plataforma:* ${info.footer_platform_note}`;
}

function formatTierBlock(tier) {
  const bullets = tier.bullets.map((b) => `• ${b}`).join('\n');
  return `${tier.label} — ${tier.price}\n${bullets}`;
}

function buildPricingMarkdown(cfg, paymentSection, whatsappDisplay) {
  const tiersBlock = cfg.tiers.map(formatTierBlock).join('\n\n');
  return `💳 *Precios (Early Bird)*

${tiersBlock}

${paymentSection}

📩 *Después del pago:*
Envía captura + nombre + tier
al WhatsApp: ${whatsappDisplay}`;
}

module.exports = {
  CONFIG_PATH,
  loadWorkshopConfig,
  buildWelcomeBase,
  buildInfoMarkdown,
  buildPricingMarkdown
};
