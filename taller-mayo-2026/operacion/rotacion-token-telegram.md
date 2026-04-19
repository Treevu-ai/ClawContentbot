# Rotación del token del bot de Telegram (BotFather + Railway)

Hacelo si el token apareció en logs, chats, capturas o un repo público. **No compartas el token nuevo en ningún chat.**

## 1. BotFather

1. Abrí Telegram y el chat con **@BotFather**.
2. Enviá `/mybots` → elegí tu bot.
3. **API Token** → **Revoke current token** (o equivalente para generar uno nuevo).
4. Copiá el **nuevo token** y guardalo solo en un gestor seguro (o pegalo directo en Railway en el paso 3).

## 2. Railway — variable de entorno

1. Entrá al proyecto → servicio del bot → **Variables**.
2. Editá **`TELEGRAM_BOT_TOKEN`** con el token nuevo.
3. Guardá. Railway redeployea solo o forzá un redeploy.

## 3. Webhook

Tu `bot.js` llama a `setWebHook` al arrancar con la URL `https://TU_DOMINIO/<TOKEN>`.  
Al cambiar el token, **la ruta del webhook cambia**. Con un deploy limpio del mismo código, el proceso debería registrar el webhook nuevo solo.

Verificá en logs algo como: `webhook set` con la URL enmascarada.

## 4. Prueba rápida

1. En Telegram: `/start` al bot → debe responder.
2. Si no responde: revisá logs del servicio y que no quede **token viejo** en ningún otro entorno (staging, otro Railway service).

## 5. Limpieza

- Borrá capturas de pantalla viejas con el token.
- Si el repo llegó a tener token en texto (historial Git), considerá **rotar igual** y usar solo variables de entorno.

---

*Checklist corto; no sustituye la doc oficial de Telegram/Railway.*
