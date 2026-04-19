const test = require('node:test');
const assert = require('node:assert/strict');
const { paymentConfigured, buildPaymentSection } = require('../lib/payment');

test('paymentConfigured false sin env', () => {
  assert.equal(
    paymentConfigured({}),
    false
  );
});

test('paymentConfigured true con PAYMENT_INFO_MARKDOWN', () => {
  assert.equal(
    paymentConfigured({ PAYMENT_INFO_MARKDOWN: 'Banco: x' }),
    true
  );
});

test('paymentConfigured true con las cuatro variables', () => {
  assert.equal(
    paymentConfigured({
      PAYMENT_BANCO: 'BCP',
      PAYMENT_CUENTA: '1',
      PAYMENT_CCI: '2',
      PAYMENT_TITULAR: 'X'
    }),
    true
  );
});

test('buildPaymentSection usa markdown completo', () => {
  const s = buildPaymentSection({ PAYMENT_INFO_MARKDOWN: '🏦 ok' });
  assert.ok(s.includes('ok'));
});
