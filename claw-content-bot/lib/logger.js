/**
 * Logs en una línea JSON (fácil de filtrar en Railway / jq).
 */
function log(level, msg, meta = {}) {
  const line = JSON.stringify({
    svc: 'taller-bot',
    level,
    msg,
    ts: new Date().toISOString(),
    ...meta
  });
  if (level === 'error') console.error(line);
  else console.log(line);
}

module.exports = { log };
