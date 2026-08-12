import { test, expect } from '@playwright/test';

const BASE = 'http://localhost:5173';
const API = 'http://127.0.0.1:5000';

test('01 Homepage loads', async ({ page }) => {
  await page.goto(BASE);
  await expect(page.locator('body')).not.toBeEmpty();
});

test('02 Homepage responds', async ({ page }) => {
  const r = await page.goto(BASE);
  expect(r.status()).toBeLessThan(400);
});

test('03 Homepage has content', async ({ page }) => {
  await page.goto(BASE);
  expect(await page.locator('body').innerText()).toBeTruthy();
});

test('04 Menu API works', async ({ request }) => {
  const r = await request.get(`${API}/api/menu`);
  expect(r.ok()).toBeTruthy();
});

test('05 Menu returns array', async ({ request }) => {
  const d = await (await request.get(`${API}/api/menu`)).json();
  expect(Array.isArray(d)).toBeTruthy();
});

test('06 Menu has items', async ({ request }) => {
  const d = await (await request.get(`${API}/api/menu`)).json();
  expect(d.length).toBeGreaterThan(0);
});

test('07 Menu has at least 10 seeded items', async ({ request }) => {
  const d = await (await request.get(`${API}/api/menu`)).json();
  expect(d.length).toBeGreaterThanOrEqual(10);
});

test('08 Items have IDs', async ({ request }) => {
  const d = await (await request.get(`${API}/api/menu`)).json();
  expect(d.every(x => x._id)).toBeTruthy();
});

test('09 Items have names', async ({ request }) => {
  const d = await (await request.get(`${API}/api/menu`)).json();
  expect(d.every(x => x.name)).toBeTruthy();
});

test('10 Names are non-empty', async ({ request }) => {
  const d = await (await request.get(`${API}/api/menu`)).json();
  expect(d.every(x => x.name.trim())).toBeTruthy();
});

test('11 Items have descriptions', async ({ request }) => {
  const d = await (await request.get(`${API}/api/menu`)).json();
  expect(d.every(x => x.description)).toBeTruthy();
});

test('12 Items have prices', async ({ request }) => {
  const d = await (await request.get(`${API}/api/menu`)).json();
  expect(d.every(x => typeof x.price === 'number')).toBeTruthy();
});

test('13 Prices are non-negative', async ({ request }) => {
  const d = await (await request.get(`${API}/api/menu`)).json();
  expect(d.every(x => x.price >= 0)).toBeTruthy();
});

test('14 Items have categories', async ({ request }) => {
  const d = await (await request.get(`${API}/api/menu`)).json();
  expect(d.every(x => x.category)).toBeTruthy();
});

test('15 Availability is boolean', async ({ request }) => {
  const d = await (await request.get(`${API}/api/menu`)).json();
  expect(d.every(x => typeof x.available === 'boolean')).toBeTruthy();
});

test('16 Menu returns JSON', async ({ request }) => {
  const r = await request.get(`${API}/api/menu`);
  expect(r.headers()['content-type']).toContain('application/json');
});

test('17 Menu IDs are unique', async ({ request }) => {
  const d = await (await request.get(`${API}/api/menu`)).json();
  const ids = d.map(x => x._id);
  expect(new Set(ids).size).toBe(ids.length);
});

test('18 At least one item is available', async ({ request }) => {
  const d = await (await request.get(`${API}/api/menu`)).json();
  expect(d.some(x => x.available)).toBeTruthy();
});

test('19 Menu response is fast', async ({ request }) => {
  const s = Date.now();
  const r = await request.get(`${API}/api/menu`);
  expect(r.ok()).toBeTruthy();
  expect(Date.now() - s).toBeLessThan(5000);
});

test('20 Invalid menu route rejected', async ({ request }) => {
  const r = await request.get(`${API}/api/menu/invalid-id`);
  expect(r.status()).toBeGreaterThanOrEqual(400);
});

test('21 Unknown API route rejected', async ({ request }) => {
  const r = await request.get(`${API}/api/not-a-real-route`);
  expect(r.status()).toBeGreaterThanOrEqual(400);
});

test('22 Admin login page loads', async ({ page }) => {
  await page.goto(`${BASE}/admin/login`);
  await expect(page.locator('body')).not.toBeEmpty();
});

test('23 Admin login has password field', async ({ page }) => {
  await page.goto(`${BASE}/admin/login`);
  await expect(page.locator('input[type="password"]')).toBeVisible();
});

test('24 Admin login has input fields', async ({ page }) => {
  await page.goto(`${BASE}/admin/login`);
  expect(await page.locator('input').count()).toBeGreaterThan(0);
});

test('25 Admin password accepts input', async ({ page }) => {
  await page.goto(`${BASE}/admin/login`);
  const p = page.locator('input[type="password"]');
  await p.fill('test-password');
  await expect(p).toHaveValue('test-password');
});

test('26 Admin username accepts text', async ({ page }) => {
  await page.goto(`${BASE}/admin/login`);
  const i = page.locator('input').first();
  await i.fill('admin');
  await expect(i).toHaveValue('admin');
});

test('27 Homepage reload works', async ({ page }) => {
  await page.goto(BASE);
  await page.reload();
  await expect(page.locator('body')).not.toBeEmpty();
});

test('28 Mobile homepage loads', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(BASE);
  await expect(page.locator('body')).not.toBeEmpty();
});

test('29 Mobile admin login loads', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${BASE}/admin/login`);
  await expect(page.locator('body')).not.toBeEmpty();
});

test('30 Menu names are strings', async ({ request }) => {
  const d = await (await request.get(`${API}/api/menu`)).json();
  expect(d.every(x => typeof x.name === 'string')).toBeTruthy();
});

test('31 Descriptions are strings', async ({ request }) => {
  const d = await (await request.get(`${API}/api/menu`)).json();
  expect(d.every(x => typeof x.description === 'string')).toBeTruthy();
});

test('32 Categories are strings', async ({ request }) => {
  const d = await (await request.get(`${API}/api/menu`)).json();
  expect(d.every(x => typeof x.category === 'string')).toBeTruthy();
});

test('33 Prices are finite', async ({ request }) => {
  const d = await (await request.get(`${API}/api/menu`)).json();
  expect(d.every(x => Number.isFinite(x.price))).toBeTruthy();
});

test('34 Core menu fields exist', async ({ request }) => {
  const d = await (await request.get(`${API}/api/menu`)).json();

  for (const x of d) {
    expect(x._id).toBeTruthy();
    expect(x.name).toBeTruthy();
    expect(x.price).toBeDefined();
    expect(x.category).toBeTruthy();
  }
});

test('35 Repeated menu requests work', async ({ request }) => {
  for (let i = 0; i < 3; i++) {
    const r = await request.get(`${API}/api/menu`);
    expect(r.ok()).toBeTruthy();
  }
});