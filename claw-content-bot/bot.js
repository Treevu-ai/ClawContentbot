require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const { log } = require('./lib/logger');
const { paymentConfigured, buildPaymentSection } = require('./lib/payment');
const {
  loadWorkshopConfig,
  buildWelcomeBase,
  buildInfoMarkdown,
  buildPricingMarkdown
} = require('./workshop-copy');

const cfg = loadWorkshopConfig();
const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const PORT = process.env.PORT || 3000;

if (!TOKEN || !String(TOKEN).trim()) {
  log('error', 'missing TELEGRAM_BOT_TOKEN');
  process.exit(1);
}

const WA = process.env.TALLER_WHATSAPP || cfg.defaults.whatsapp_display;

function maskWebhookUrl(url) {
  if (!url || !TOKEN) return url;
  return url.split(TOKEN).join('***');
}

function mensajeMenuPrincipal(ctaSuffix) {
  return `${buildWelcomeBase(cfg)}\n\n${ctaSuffix}`;
}

const app = express();
app.use(express.json());

const bot = new TelegramBot(TOKEN, { polling: false });

bot.on('error', (err) => {
  log('error', 'telegram bot error', { message: err.message });
});

app.post(`/${TOKEN}`, (req, res) => {
  try {
    bot.processUpdate(req.body);
    res.sendStatus(200);
  } catch (err) {
    log('error', 'processUpdate failed', { message: err.message });
    res.sendStatus(500);
  }
});

app.get('/health', (_req, res) => {
  res.type('text').send('OK');
});

/** Liveness + señales operativas (sin secretos). */
app.get('/ready', (_req, res) => {
  res.json({
    ok: true,
    slug: cfg.slug || null,
    paymentConfigured: paymentConfigured()
  });
});

app.get('/', (_req, res) => {
  res.send('🎓 TallerAgente Bot is running!');
});

const menuPrincipal = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: '📋 Info del Taller', callback_data: 'info' }],
      [{ text: '💳 Precios y Pago', callback_data: 'precios' }],
      [{ text: '📱 WhatsApp', callback_data: 'wa' }],
      [{ text: '🏠 Volver', callback_data: 'menu_main' }]
    ]
  })
};

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const texto = mensajeMenuPrincipal('Selecciona una opción:');
  bot.sendMessage(chatId, texto, { parse_mode: 'Markdown', ...menuPrincipal });
});

bot.on('callback_query', (query) => {
  if (!query.message) {
    bot.answerCallbackQuery(query.id).catch(() => {});
    log('warn', 'callback_query missing message', { data: query.data });
    return;
  }

  const chatId = query.message.chat.id;
  const data = query.data;

  bot.answerCallbackQuery(query.id);

  if (data === 'menu_main') {
    bot.editMessageText(mensajeMenuPrincipal('Selecciona una opción:'), {
      chat_id: chatId,
      message_id: query.message.message_id,
      parse_mode: 'Markdown',
      reply_markup: menuPrincipal.reply_markup
    });
    return;
  }

  if (data === 'info') {
    bot.sendMessage(chatId, buildInfoMarkdown(cfg), {
      parse_mode: 'Markdown',
      ...menuPrincipal
    });
    return;
  }

  if (data === 'precios') {
    const payment = buildPaymentSection();
    const precios = buildPricingMarkdown(cfg, payment, WA);
    bot.sendMessage(chatId, precios, { parse_mode: 'Markdown', ...menuPrincipal });
    return;
  }

  if (data === 'wa') {
    bot.sendMessage(
      chatId,
      `📱 *Escríbeme al WhatsApp: ${WA}*

Para inscribirte o resolver dudas sobre el taller.`,
      { parse_mode: 'Markdown', ...menuPrincipal }
    );
  }
});

bot.on('message', (msg) => {
  if (msg.text && !msg.text.startsWith('/')) {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Usa /start para ver el menú 🎓', { parse_mode: 'Markdown' });
  }
});

app.listen(PORT, () => {
  log('info', 'listening', { port: PORT });

  if (!paymentConfigured()) {
    log('warn', 'payment not configured in env; bot shows placeholder until PAYMENT_* or PAYMENT_INFO_MARKDOWN');
  }

  const RAILWAY_PUBLIC_DOMAIN =
    process.env.RAILWAY_PUBLIC_DOMAIN ||
    (process.env.RAILWAY_ENVIRONMENT
      ? `${process.env.RAILWAY_SERVICE_NAME}.up.railway.app`
      : 'tu-proyecto.up.railway.app');
  const WEBHOOK_URL = process.env.WEBHOOK_URL || `https://${RAILWAY_PUBLIC_DOMAIN}/${TOKEN}`;

  bot
    .setWebHook(WEBHOOK_URL)
    .then(() => log('info', 'webhook set', { url: maskWebhookUrl(WEBHOOK_URL) }))
    .catch((err) => log('error', 'webhook failed', { message: err.message }));
});

log('info', 'process started');
