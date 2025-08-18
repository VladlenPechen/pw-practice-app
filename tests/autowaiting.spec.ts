import {test, expect} from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => { 
    await page.goto(process.env.url);
    await page.getByText('Button Triggering AJAX Request').click();
    testInfo.setTimeout(testInfo.timeout * 2); // Double the timeout for this test
})

test('auto waiting', async ({ page }) => {
const successButton = page.locator('.bg-success')
await successButton.click();

//const successButtonTextContent = await successButton.textContent();

await successButton.waitFor({ state: 'attached' });

const successButtonTextContent = await successButton.allTextContents();

expect(successButtonTextContent).toContain('Data loaded with AJAX get request.');

await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout : 20000});
})

test('alternative waits', async ({ page }) => {
    const successButton = page.locator('.bg-success')

    //wait for element

    // await page.waitForSelector('.bg-success');

    //wait for particular response
    //await page.waitForResponse('http://uitestplayground.com/ajaxdata');

    //wait for network calls to be completed (NOT RECOMMENDED)
    await page.waitForLoadState('networkidle');

const successButtonTextContent = await successButton.allTextContents();

expect(successButtonTextContent).toContain('Data loaded with AJAX get request.');
})

test('timeouts', async ({ page }) => {
    test.setTimeout(10000); //set timeout for the test
    test.slow(); //increases default timeout x3
    const successButton = page.locator('.bg-success');
    await successButton.click();
})