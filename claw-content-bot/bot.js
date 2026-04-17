const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const path = require('path');

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const PORT = process.env.PORT || 3000;

// Webhook mode para Railway
const app = express();
app.use(express.json());

const bot = new TelegramBot(TOKEN);

// Webhook endpoint - Railway necesita esta ruta exacta
app.post(`/${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Health check
app.get('/', (req, res) => {
  res.send('🦀 Claw Content Bot is running!');
});

app.listen(PORT, () => {
  console.log(`🦀 Server running on port ${PORT}`);
  
  // Configurar webhook - usa WEBHOOK_URL si está definido, si no usa el de Railway
  const RAILWAY_PUBLIC_DOMAIN = process.env.RAILWAY_PUBLIC_DOMAIN || 'tu-proyecto.up.railway.app';
  const WEBHOOK_URL = process.env.WEBHOOK_URL || `https://${RAILWAY_PUBLIC_DOMAIN}/${TOKEN}`;
  bot.setWebHook(WEBHOOK_URL)
    .then(() => console.log(`✅ Webhook set to ${WEBHOOK_URL}`))
    .catch(err => console.error('❌ Webhook error:', err));
});

// Tu chat ID para notificaciones
const OWNER_CHAT_ID = process.env.OWNER_CHAT_ID || '7220858989';

//negocios
const NEGOCIOS = {
  sinapsis: {
    nombre: 'Sinapsis Innovadora',
    descripcion: 'Consultoría estratégica, innovación y transformación',
    hashtags: '#SinapsisInnovadora #Innovación #TransformaciónDigital #LatAm #Emprendimiento',
    cta: '¿Quieres una revisión gratuita de tu modelo de negocio? Escríbeme y agenda un diagnóstico de 30 min.',
    urgencia: '⏰ Solo 3 espacios disponibles esta semana para diagnósticos gratuitos.'
  },
  treevu: {
    nombre: 'Treevü',
    descripcion: 'SaaS B2B: Cash flow, adelantos de nómina, retención',
    hashtags: '#Treevü #HR #TalentoHumano #CashFlow #PYMEsLatam #Nómina',
    cta: '¿Sabes cuánto te cuesta la rotación de personal? Solicita un análisis gratuito.',
    urgencia: '📊 Primer análisis de cash flow: gratis. Solo 5 cupos esta semana.'
  },
  pipelinex: {
    nombre: 'PipelineX',
    descripcion: 'SaaS SDR para equipos de ventas',
    hashtags: '#PipelineX #SDR #Ventas #Prospeccion #LatAm #B2B',
    cta: '¿Tu equipo pierde tiempo en leads que nunca compran? Agenda una demo personalizada.',
    urgencia: '🎯 Demo gratuita disponible. Últimos 2 horarios esta semana.'
  }
};

// Contenido pre-generado por día
// Helper para formatear contenido con CTA
function formatearContenido(texto, negocio) {
  return `${texto}

---

🔥 *${NEGOCIOS[negocio].cta}*

${NEGOCIOS[negocio].urgencia}

${NEGOCIOS[negocio].hashtags}`;
}

// Contenido pre-generado por día — AIDA + urgencia
const CONTENIDO = {
  linkedin: {
    sinapsis: `📈 *El 90% de startups en LatAm muere.* Pero no por la razón que crees.

(No es falta de idea. No es falta de capital. No es mala suerte.)

Es porque el fundador confundió «pasión» con «modelo de negocio».

Te lo voy a probar con un caso real:

En el 2019, un empresario Limeño me contactó. Su empresa facturaba 2M al año.

Problema: No sabían si ganaban o perdían. Mes a mes.

3 semanas de diagnóstico. 180K recuperados en ineficiencias.

¿Quieres saber cómo?

Un modelo de negocio bien diseñado te da 3 cosas:

✅ *Dirección* — Sabes hacia dónde vas
✅ *Visión* — Ves los problemas antes de que sean crisis
✅ *Ventaja* — Apalas conocimiento, no solo tiempo

*Tu turno:* Si me puedes explicar en 30 segundos cómo ganas dinero, tienes modelo. Si no... tienes hobby con empleados.`,
    
    treevu: `💸 Trabajar en RRHH en una PYME es caminar en arena movediza.

Pero hay un problema que pocos gerentes dicen en voz alta:

*«El ausentismo no es un problema de asistencia. Es un problema de engagement.»*

Te explico con números:

• Costo promedio de reemplazar un empleado: 1.5 a 2x su salario anual
• Cada 10 empleados que se van innecesariamente = -150K soles/año

Un empleado que falta no es perezoso.
Es un empleado que *ya no ve razón para quedarse.*

3 señales de alerta:
1️⃣ Absentismo > 5% mensual
2️⃣ Rotación > 20% anual
3️⃣ Evaluaciones de desempeñodeclinación progresiva

*Pregunta:* ¿Cuánto te está costando NO resolver esto?

Si la respuesta te sorprendió... tenemos trabajo que hacer.`,
    
    pipelinex: `⏱️ Un vendedor promedio en LatAm pasa *4 horas al día* en tareas que no son venta.

4 horas. Eso es 50% de su jornada.

La razón principal: están prospectando mal. Listas compradas. Emails genéricos. Cold calls sin preparación.

El resultado:
• 80% de emails no reciben respuesta
• 90% de calls no convierten

¿En qué se van esas 4 horas?
• Buscar leads irrelevantes
• Escribir emails que nadie lee
• Perseguir a personas que nunca van a comprar

*El secreto de un SDR eficiente no es trabajar más horas. Es eliminar las horas que no producen.*

3 cambios que reducen tu tiempo de prospección a la mitad:

1️⃣ Filtra por ICP (Ideal Customer Profile) ANTES de contactar
2️⃣ Personaliza el primer mensaje — la bandeja de entrada lo sabe
3️⃣ Usa secuencias, no emails únicos

*Tu turno:* ¿Cuántas horas semanales pierde tu equipo en prospección ineficiente?

Si son más de 20... el problema no es el equipo. Es el sistema.`,
  },
  
  instagram: {
    sinapsis: `⚠️ *3 señales de que tu negocio tiene un problema de modelo (no de ventas)*

Si reconoces al menos 2 de estas 3:

1️⃣ Pagas gastos ANTES de recibir ingresos
2️⃣ Clientes te pagan a 60+ días
3️⃣ Siempre estás "por llegar" al equilibrio

El problema NO es la venta.
Es el timing del dinero.

📌 Guarda este post. Revísalo el próximo lunes.
Si después de eso sigues sin saber tu punto de equilibrio... DM me. Tengo un ejercicio de 15 min que te lo clarifica.

⏰ *Esta semana: 3 diagnósticos gratuitos disponibles.*`,
    
    treevu: `⚠️ *3 señales de que tu PYME tiene un problema de cash flow*

Si reconoces al menos 2:

1️⃣ Pagas nóminas ANTES de recibir ingresos
2️⃣ Clientes te pagan a 60+ días
3️⃣ Siempre estás "por llegar" al equilibrio

📌 ¿Te suena familiar?

💡 *Tip:* No es un problema de ventas. Es un problema de timing.

📩 DM si quieres un análisis rápido de tu situación. Gratis.

⏰ *Últimos 5 cupos esta semana.*`,
    
    pipelinex: `📊 *5 herramientas que todo SDR necesita en 2026*

1️⃣ LinkedIn Sales Navigator → Prospección precisa
2️⃣ Apollo → Base de datos B2B
3️⃣ La tuya → *PipelineX* 😏
4️⃣ Calendly → Agendar sin fricción
5️⃣ Loom → Demos en 2 min

*Pregunta:* ¿Cuál te falta?

📩 Comenta cuál y te envío una guía para implementarla.

🎯 *Demo de PipelineX: Últimos 2 horarios disponibles.*`,
  },
  
  tiktok: {
    sinapsis: `🎬 *POV: Un cliente me llama a las 11pm* 

«Ricardo, no dormí. Estoy viendo números que no entiendo.»

Su empresa facturaba 2M al año.
Pero no sabía si ganaba o perdía.

3 semanas después del diagnóstico:
*180K recuperados.* Sin vender un solo producto nuevo.

«No era un problema de ventas. Era un problema de modelo.»

♻️ Save para tu próxima revisión trimestral
📩 DM si quieres un diagnóstico exprés`,
    
    treevu: `🎬 *POV: Gerente de RRHH a las 9am* 

«Otro mes con 15% de ausentismo. another día.»

Pero esto no es un problema de asistencia.

Es un problema de engagement.

*Costo de rotación innecesaria:* 1.5x a 2x salario anual por empleado.

10 empleados que se van = -150K soles/año

No es un problema de RH.
Es un problema de *negocio.*

♻️ Save si trabajas en RRHH
📊 dm para análisis gratuito`,
    
    pipelinex: `🎬 *POV: SDR después de enviar 200 emails genéricos*

«0 respuestas. ¿Qué estoy haciendo mal?»

*Todo.*

80% de emails no reciben respuesta porque son genéricos.

El secreto no es trabajar más horas.
Es filtrar mejor.

1️⃣ Filtra por ICP antes de escribir
2️⃣ Personaliza el primer mensaje
3️⃣ Usa secuencias de 5-7 touches

*Prospectar bien = más demos, menos frustración.*

♻️ Save para tu próxima campaña
🎯 Demo de PipelineX en mi bio`,
  },
  
  images: {
    sinapsis: {
      prompt: `Professional LinkedIn post image. An entrepreneur drawing a business model canvas on a glass whiteboard. Modern office in Lima, Peru. Clean, minimalist, corporate. Blue and orange accent colors. Text overlay space on right side. --ar 16:9`,
      caption: `🎨 *Image Prompt para Sinapsis Innovadora:*

\`${CONTENIDO.images.sinapsis.prompt}\`

---

📩 *¿Necesitas ayuda con tu modelo de negocio?* Escríbeme para un diagnóstico gratuito.`
    },
    treevu: {
      prompt: `Professional LinkedIn post image. Two business professionals shaking hands in a modern office. HR concept. Warm lighting, Latin American context. Clean corporate style. Green and blue brand colors. Text space on right. --ar 16:9`,
      caption: `🎨 *Image Prompt para Treevü:*

\`${CONTENIDO.images.treevu.prompt}\`

---

📊 *¿Sabes cuánto te cuesta la rotación en tu empresa?* Solicita un análisis gratuito.`
    },
    pipelinex: {
      prompt: `Professional LinkedIn post image. A sales professional looking at a pipeline dashboard with charts and graphs. Modern CRM interface. Latin American business context. Orange and blue brand colors. Clean, data-driven. --ar 16:9`,
      caption: `🎨 *Image Prompt para PipelineX:*

\`${CONTENIDO.images.pipelinex.prompt}\`

---

🎯 *¿Quieres optimizar tu pipeline de ventas?* Agenda una demo personalizada.`
    }
  }
};

// Menú principal
const menuPrincipal = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: '📘 LinkedIn', callback_data: 'menu_linkedin' }],
      [{ text: '📸 Instagram', callback_data: 'menu_instagram' }],
      [{ text: '🎵 TikTok', callback_data: 'menu_tiktok' }],
      [{ text: '🎨 Image Prompts', callback_data: 'menu_images' }],
      [{ text: '📊 Contenido Semanal', callback_data: 'menu_semanal' }]
    ]
  })
};

// Menús de negocio
const menusNegocio = {
  linkedin: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: '📘 Sinapsis Innovadora', callback_data: 'li_sinapsis' }],
        [{ text: '📘 Treevü', callback_data: 'li_treevu' }],
        [{ text: '📘 PipelineX', callback_data: 'li_pipelinex' }],
        [{ text: '🔙 Volver', callback_data: 'menu_main' }]
      ]
    })
  },
  instagram: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: '📸 Sinapsis Innovadora', callback_data: 'ig_sinapsis' }],
        [{ text: '📸 Treevü', callback_data: 'ig_treevu' }],
        [{ text: '📸 PipelineX', callback_data: 'ig_pipelinex' }],
        [{ text: '🔙 Volver', callback_data: 'menu_main' }]
      ]
    })
  },
  tiktok: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: '🎵 Sinapsis Innovadora', callback_data: 'tt_sinapsis' }],
        [{ text: '🎵 Treevü', callback_data: 'tt_treevu' }],
        [{ text: '🎵 PipelineX', callback_data: 'tt_pipelinex' }],
        [{ text: '🔙 Volver', callback_data: 'menu_main' }]
      ]
    })
  },
  images: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: '🎨 Sinapsis', callback_data: 'img_sinapsis' }],
        [{ text: '🎨 Treevü', callback_data: 'img_treevu' }],
        [{ text: '🎨 PipelineX', callback_data: 'img_pipelinex' }],
        [{ text: '🔙 Volver', callback_data: 'menu_main' }]
      ]
    })
  }
};

// Mensaje de bienvenida
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 
    `🦀 *Claw Content Bot*\n\nHola! Soy tu asistente de contenido para redes sociales.\n\n3 negocios disponibles:\n• Sinapsis Innovadora\n• Treevü\n• PipelineX\n\nSelecciona una opción:`, 
    { parse_mode: 'Markdown', ...menuPrincipal }
  );
});

// Handle callback queries
bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;
  
  // Acknowledge the callback
  bot.answerCallbackQuery(query.id);
  
  // Main menu
  if (data === 'menu_main') {
    bot.editMessageText(`🦀 *Claw Content Bot*\n\nSelecciona una opción:`, {
      chat_id: chatId,
      message_id: query.message.message_id,
      parse_mode: 'Markdown',
      reply_markup: menuPrincipal.reply_markup
    });
    return;
  }
  
  // Sub-menus
  if (data === 'menu_linkedin') {
    bot.editMessageText('📘 *LinkedIn*\n\nSelecciona un negocio:', {
      chat_id: chatId,
      message_id: query.message.message_id,
      parse_mode: 'Markdown',
      reply_markup: menusNegocio.linkedin.reply_markup
    });
    return;
  }
  
  if (data === 'menu_instagram') {
    bot.editMessageText('📸 *Instagram*\n\nSelecciona un negocio:', {
      chat_id: chatId,
      message_id: query.message.message_id,
      parse_mode: 'Markdown',
      reply_markup: menusNegocio.instagram.reply_markup
    });
    return;
  }
  
  if (data === 'menu_tiktok') {
    bot.editMessageText('🎵 *TikTok*\n\nSelecciona un negocio:', {
      chat_id: chatId,
      message_id: query.message.message_id,
      parse_mode: 'Markdown',
      reply_markup: menusNegocio.tiktok.reply_markup
    });
    return;
  }
  
  if (data === 'menu_images') {
    bot.editMessageText('🎨 *Image Prompts*\n\nSelecciona un negocio:', {
      chat_id: chatId,
      message_id: query.message.message_id,
      parse_mode: 'Markdown',
      reply_markup: menusNegocio.images.reply_markup
    });
    return;
  }
  
  if (data === 'menu_semanal') {
    const semanal = `📊 *Contenido Semanal*\n\n*Lunes:*\n📘 LinkedIn: Sinapsis\n📸 Instagram: Treevü\n🎵 TikTok: PipelineX\n\n*Martes:*\n📘 LinkedIn: Treevü\n📸 Instagram: PipelineX\n🎵 TikTok: Sinapsis\n\n*Miércoles:*\n📘 LinkedIn: PipelineX\n📸 Instagram: Sinapsis\n🎵 TikTok: Treevü\n\n*Jueves:*\n📘 LinkedIn: Sinapsis\n📸 Instagram: Treevü\n🎵 TikTok: PipelineX\n\n*Viernes:*\n📘 LinkedIn: Treevü\n📸 Instagram: PipelineX\n🎵 TikTok: Sinapsis`;
    
    bot.sendMessage(chatId, semanal, { parse_mode: 'Markdown', ...menuPrincipal });
    return;
  }
  
  // Content delivery - LinkedIn (con CTA automático)
  if (data === 'li_sinapsis') {
    bot.sendMessage(chatId, formatearContenido(CONTENIDO.linkedin.sinapsis, 'sinapsis'), { parse_mode: 'Markdown' });
    return;
  }
  if (data === 'li_treevu') {
    bot.sendMessage(chatId, formatearContenido(CONTENIDO.linkedin.treevu, 'treevu'), { parse_mode: 'Markdown' });
    return;
  }
  if (data === 'li_pipelinex') {
    bot.sendMessage(chatId, formatearContenido(CONTENIDO.linkedin.pipelinex, 'pipelinex'), { parse_mode: 'Markdown' });
    return;
  }
  
  // Content delivery - Instagram (con CTA automático)
  if (data === 'ig_sinapsis') {
    bot.sendMessage(chatId, formatearContenido(CONTENIDO.instagram.sinapsis, 'sinapsis'), { parse_mode: 'Markdown' });
    return;
  }
  if (data === 'ig_treevu') {
    bot.sendMessage(chatId, formatearContenido(CONTENIDO.instagram.treevu, 'treevu'), { parse_mode: 'Markdown' });
    return;
  }
  if (data === 'ig_pipelinex') {
    bot.sendMessage(chatId, formatearContenido(CONTENIDO.instagram.pipelinex, 'pipelinex'), { parse_mode: 'Markdown' });
    return;
  }
  
  // Content delivery - TikTok (con CTA automático)
  if (data === 'tt_sinapsis') {
    bot.sendMessage(chatId, formatearContenido(CONTENIDO.tiktok.sinapsis, 'sinapsis'), { parse_mode: 'Markdown' });
    return;
  }
  if (data === 'tt_treevu') {
    bot.sendMessage(chatId, formatearContenido(CONTENIDO.tiktok.treevu, 'treevu'), { parse_mode: 'Markdown' });
    return;
  }
  if (data === 'tt_pipelinex') {
    bot.sendMessage(chatId, formatearContenido(CONTENIDO.tiktok.pipelinex, 'pipelinex'), { parse_mode: 'Markdown' });
    return;
  }
  
  // Image prompts (con CTA)
  if (data === 'img_sinapsis') {
    bot.sendMessage(chatId, CONTENIDO.images.sinapsis.caption, { parse_mode: 'Markdown' });
    return;
  }
  if (data === 'img_treevu') {
    bot.sendMessage(chatId, CONTENIDO.images.treevu.caption, { parse_mode: 'Markdown' });
    return;
  }
  if (data === 'img_pipelinex') {
    bot.sendMessage(chatId, CONTENIDO.images.pipelinex.caption, { parse_mode: 'Markdown' });
    return;
  }
});

// Handle messages
bot.on('message', (msg) => {
  if (msg.text && !msg.text.startsWith('/')) {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 
      'Usa /start para ver el menú de opciones 🦀', 
      { parse_mode: 'Markdown' }
    );
  }
});

console.log('🦀 Claw Content Bot started with webhook!');
