import { test } from '@applitools/eyes-playwright/fixture';

test.only('Applitools Visual Testing', async ({ page, eyes }) => {
    await page.goto('/');

    await eyes.check('Homepage');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
    await eyes.check('Form Layouts Page');
});