import { expect, test } from '@playwright/test';

test('open new tab, google fox, verify images tab contains fox animal', async ({ context }) => {
    const newTab = await context.newPage();

    await newTab.goto('https://www.google.com');

    const searchInput = newTab.locator('textarea[name="q"], input[name="q"]').first();
    await searchInput.fill('fox');
    await searchInput.press('Enter');

    await newTab.waitForLoadState('domcontentloaded');

    const imagesTab = newTab.getByRole('link', { name: /images/i }).first();
    await imagesTab.click();

    await newTab.waitForLoadState('domcontentloaded');

    await expect(newTab).toHaveTitle(/fox/i);
});
