/**
 * Configuración de datos de pago solo vía variables de entorno (nunca en repo).
 */
function paymentConfigured(env = process.env) {
  if (env.PAYMENT_INFO_MARKDOWN?.trim()) return true;
  const banco = env.PAYMENT_BANCO?.trim();
  const cuenta = env.PAYMENT_CUENTA?.trim();
  const cci = env.PAYMENT_CCI?.trim();
  const titular = env.PAYMENT_TITULAR?.trim();
  return !!(banco && cuenta && cci && titular);
}

function buildPaymentSection(env = process.env) {
  const full = env.PAYMENT_INFO_MARKDOWN?.trim();
  if (full) return full;

  const banco = env.PAYMENT_BANCO?.trim();
  const cuenta = env.PAYMENT_CUENTA?.trim();
  const cci = env.PAYMENT_CCI?.trim();
  const titular = env.PAYMENT_TITULAR?.trim();

  if (banco && cuenta && cci && titular) {
    return `🏦 *Datos de pago:*
Banco: ${banco}
Cuenta: ${cuenta}
CCI: ${cci}
Titular: ${titular}`;
  }

  return `🏦 *Datos de pago:*
Configura en el servidor \`PAYMENT_INFO_MARKDOWN\` o las variables \`PAYMENT_BANCO\`, \`PAYMENT_CUENTA\`, \`PAYMENT_CCI\`, \`PAYMENT_TITULAR\`.
Mientras tanto, escribe al WhatsApp para recibir los datos.`;
}

module.exports = { paymentConfigured, buildPaymentSection };
