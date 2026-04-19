const test = require('node:test');
const assert = require('node:assert/strict');
const {
  loadWorkshopConfig,
  buildWelcomeBase,
  buildInfoMarkdown,
  buildPricingMarkdown
} = require('../workshop-copy');

test('workshop.config.json carga y tiers tienen precio_amount', () => {
  const cfg = loadWorkshopConfig();
  assert.ok(cfg.title);
  assert.ok(Array.isArray(cfg.tiers));
  for (const t of cfg.tiers) {
    assert.ok(t.price_amount > 0);
    assert.ok(t.label);
  }
});

test('copy incluye título del taller', () => {
  const cfg = loadWorkshopConfig();
  const w = buildWelcomeBase(cfg);
  assert.match(w, new RegExp(cfg.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
});

test('precios generan bloque con Early Bird', () => {
  const cfg = loadWorkshopConfig();
  const block = buildPricingMarkdown(cfg, '🏦 test', '999');
  assert.match(block, /Precios \(Early Bird\)/);
  assert.ok(block.includes('999'));
});

test('info incluye stack', () => {
  const cfg = loadWorkshopConfig();
  const info = buildInfoMarkdown(cfg);
  assert.ok(info.includes('Claude'));
});
