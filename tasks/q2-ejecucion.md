# Tablero de ejecución — Taller Mayo 2026 / Q2 2026

Estado del repo al 18-abr-2026. Prioridades derivadas del informe (status, deuda, posibilidades).

## Prioridades (orden sugerido)

| # | Iniciativa | Área | Resultado esperado | Métrica |
|---|------------|------|--------------------|---------|
| 1 | Variables de entorno para pago + WhatsApp en Railway | Tech | Datos sensibles fuera del código | 0 cuentas bancarias en `bot.js` en main |
| 2 | Una sola fuente de verdad para fechas/precios (bot ↔ landing ↔ slides) | Producto/Ops | `workshop.config.json` alimenta el bot; `npm run verify:assets` alinea precios con landing | 0 fallos en `verify:assets` tras cambios |
| 3 | Embudo mínimo medido (landing → TG/WA → pago) | Negocio | Saber qué canal convierte | Usar `taller-mayo-2026/operacion/embudo-y-metricas.md` + tabla semanal |
| 4 | Plan B en vivo (checklist 1 página, responsable, links backup) | Operación | Menos caos si cae una herramienta | Lista usada en cada sesión 0–4 |
| 5 | Prueba social sustituta (demo, garantía, “por qué yo”) | Marketing | + claridad de conversión | Versión publicada en landing + bot |
| 6 | Homework “1 entrevista real” sesión 2 | Producto | Menos validación solo sintética | % cohorte con entregable |

## Propietario sugerido (ajustar a tu equipo real)

| Tema | Quién típicamente |
|------|---------------------|
| Railway / env / bot | Instructor o quien despliega |
| Copy y fechas unificadas | Instructor + revisión rápida |
| Embudo y números | Instructor o asistente |
| Contingencia en vivo | Instructor |

## Definición de “hecho” para esta ola

- Bot: `TELEGRAM_BOT_TOKEN` obligatorio al arranque; pago configurable por env; bienvenida sin duplicar string.
- Documentación: `.env.example` actualizado en `claw-content-bot/`.
- Negocio: una fila en la tabla de métricas con al menos 1 semana de datos antes del cierre de inscripciones.

## Revisión

| Fecha | Notas |
|-------|--------|
| 2026-04-18 | Tablero creado; alineado con auditoría técnica y estrategia. |
| 2026-04-18 | Bot: validación de `TELEGRAM_BOT_TOKEN`, `polling: false`, bienvenida unificada, precios con `TALLER_TIERS`, pago/WhatsApp por env, log de webhook sin token; añadido `claw-content-bot/.env.example`. **Pendiente en Railway:** definir `PAYMENT_INFO_MARKDOWN` o `PAYMENT_*` para mostrar datos de pago reales. |
| 2026-04-19 | Fuente única `workshop.config.json` + `workshop-copy.js`; `dotenv` local; tests `npm test`; `npm run verify:assets` vs landing; logs con prefijo `[taller-bot]`; eliminado `temp-pdf-read.js`; `node_modules` en `.gitignore`. |
| 2026-04-19 | Deuda tech: `lib/logger.js` (JSON), `lib/payment.js`, `GET /ready`, webhook try/catch + `bot.on('error')`, callbacks sin `message` cubiertos; `npm run verify` = landing (fechas Mayo N / “N de Mayo”) + slides INDICE; overrides npm (`qs`, `form-data`, `tough-cookie`), express ^4.21.2; tests pago. **Queda:** 4 hallazgos `moderate` por dependencia `request` de `node-telegram-bot-api` (mitigación: uso solo servidor→Telegram, no SSRF user-controlled). |
| 2026-04-19 | No-código: carpeta `taller-mayo-2026/operacion/` — embudo/UTMs/métricas, rotación token Telegram, prueba social sustituta + garantía; README índice. |
