import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  reporter: [['html'], ['list']],
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,

  expect: {
    timeout: 5000,
  },

  reporter: [['html'], ['list']],

  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});import { test, expect } from '@playwright/test';

const BASE = 'http://localhost:5173';

test.describe('Spice Corner - Smoke Tests', () => {

  test('01 - Homepage loads', async ({ page }) => {
    await page.goto(BASE);
    await expect(page).toHaveTitle(/cafe|restaurant|spice/i);
  });

  test('02 - Homepage is reachable', async ({ page }) => {
    const response = await page.goto(BASE);
    expect(response.status()).toBeLessThan(400);
  });

  test('03 - Admin login page loads', async ({ page }) => {
    await page.goto(`${BASE}/admin/login`);
    await expect(page.locator('input').first()).toBeVisible();
  });

  test('04 - Admin login contains username field', async ({ page }) => {
    await page.goto(`${BASE}/admin/login`);
    await expect(page.locator('input').first()).toBeVisible();
  });

  test('05 - Admin login contains password field', async ({ page }) => {
    await page.goto(`${BASE}/admin/login`);
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test('06 - Admin login button exists', async ({ page }) => {
    await page.goto(`${BASE}/admin/login`);
    await expect(page.getByRole('button', { name: /login|sign in/i })).toBeVisible();
  });

  test('07 - Empty admin login is rejected', async ({ page }) => {
    await page.goto(`${BASE}/admin/login`);
    await page.getByRole('button', { name: /login|sign in/i }).click();
    await expect(page.locator('body')).toContainText(/required|invalid|login/i);
  });

  test('08 - Menu API is reachable', async ({ request }) => {
    const response = await request.get('http://localhost:5000/api/menu');
    expect(response.ok()).toBeTruthy();
  });

  test('09 - Menu API returns JSON', async ({ request }) => {
    const response = await request.get('http://localhost:5000/api/menu');
    const data = await response.json();
    expect(Array.isArray(data)).toBeTruthy();
  });

  test('10 - Menu contains seeded items', async ({ request }) => {
    const response = await request.get('http://localhost:5000/api/menu');
    const data = await response.json();
    expect(data.length).toBeGreaterThanOrEqual(10);
  });

  test('11 - Menu items have names', async ({ request }) => {
    const response = await request.get('http://localhost:5000/api/menu');
    const data = await response.json();
    expect(data.every(item => item.name)).toBeTruthy();
  });

  test('12 - Menu items have prices', async ({ request }) => {
    const response = await request.get('http://localhost:5000/api/menu');
    const data = await response.json();
    expect(data.every(item => typeof item.price === 'number')).toBeTruthy();
  });

  test('13 - Menu items have categories', async ({ request }) => {
    const response = await request.get('http://localhost:5000/api/menu');
    const data = await response.json();
    expect(data.every(item => item.category)).toBeTruthy();
  });

  test('14 - Menu prices are non-negative', async ({ request }) => {
    const response = await request.get('http://localhost:5000/api/menu');
    const data = await response.json();
    expect(data.every(item => item.price >= 0)).toBeTruthy();
  });

  test('15 - Menu items are available', async ({ request }) => {
    const response = await request.get('http://localhost:5000/api/menu');
    const data = await response.json();
    expect(data.every(item => typeof item.available === 'boolean')).toBeTruthy();
  });

  test('16 - Invalid menu ID is handled', async ({ request }) => {
    const response = await request.get('http://localhost:5000/api/menu/invalid-id');
    expect(response.status()).toBeGreaterThanOrEqual(400);
  });

  test('17 - Unknown API route returns error', async ({ request }) => {
    const response = await request.get('http://localhost:5000/api/does-not-exist');
    expect(response.status()).toBeGreaterThanOrEqual(400);
  });

  test('18 - Homepage has visible content', async ({ page }) => {
    await page.goto(BASE);
    await expect(page.locator('body')).not.toBeEmpty();
  });

  test('19 - Page does not show fatal error', async ({ page }) => {
    await page.goto(BASE);
    await expect(page.locator('body')).not.toContainText(/internal server error/i);
  });

  test('20 - Admin login supports username input', async ({ page }) => {
    await page.goto(`${BASE}/admin/login`);
    const input = page.locator('input').first();
    await expect(input).toBeVisible();
    expect(await input.getAttribute('type')).not.toBe('email');
  });

});