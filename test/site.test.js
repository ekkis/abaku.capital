const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

test('retained brand assets exist', () => {
  for (const asset of ['assets/abaku-logo.webp', 'assets/abaku-hero.jpg', 'assets/abaku-cuneiform.png', 'assets/mesopotamian-relief.jpg']) {
    assert.ok(fs.statSync(path.join(root, asset)).size > 1000, `${asset} should contain image data`);
    assert.match(html, new RegExp(asset.replace('.', '\\.')));
  }
});

test('mission, focus, portfolio, and etymology are present', () => {
  assert.match(html, /boutique investment firm/i);
  assert.match(html, /Vow ecosystem/i);
  for (const company of ['PriceEdge', 'VowCorp', 'Alera', 'NokNok', 'VowLabs']) {
    assert.match(html, new RegExp(`>${company}<`));
  }
  assert.match(html, /originates with the Akkadian language/);
  assert.match(html, /Global capital<br>redefined/);
  assert.match(html, /Many touchpoints/);
});

test('portfolio companies open their external sites safely', () => {
  for (const company of ['priceedge.me', 'vowcorp.net', 'alera.us.org', 'noknok.id', 'vowlabs.dev']) {
    assert.match(html, new RegExp(`href="https://${company.replaceAll('.', '\\.')}" target="_blank" rel="noopener noreferrer"`));
  }
});

test('contact page routes inquiries by purpose', () => {
  const contact = fs.readFileSync(path.join(root, 'contact.html'), 'utf8');
  assert.match(contact, /investors@abaku\.capital/);
  assert.match(contact, /partnerships@abaku\.capital/);
  assert.match(contact, /info@abaku\.capital/);
  assert.doesNotMatch(contact, /<address|<iframe|Sawgrass|Palm Bay/i);
});

test('every in-page navigation target exists', () => {
  const targets = [...html.matchAll(/href="#([^"]+)"/g)].map(match => match[1]);
  for (const target of targets) assert.match(html, new RegExp(`id="${target}"`));
});
