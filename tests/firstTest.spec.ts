import {expect, test} from '@playwright/test';



test.beforeEach(async ({page}) => {
    
        await page.goto('/');
        await page.getByText('Forms').click();
        await page.getByText('Form Layout').click();
    
})

test('Locator syntax rules', async ({page}) => {
    // by tag name
   await page.locator('input').first().click();

   // by id
   await page.locator('#inputEmail').click();

   // by class
   page.locator('.shape-rectangle');

   //by attribute
   page.locator('[placeholder="Email"]');

   //by class value (full
    page.locator("[class='input-full-width size-medium status-basic shape-rectangle nb-transition']")

    //combine different locators 
    page.locator('input[placeholder="Email"][nbinput]')

    //by xPath; not recommended
    page.locator('//*[@id="inputEmail"]')

    //by partial text match
    page.locator(':text("Using")');

    //by exact text match
    page.locator(':text-is("Using the Grid")');
})

test('User facing locators', async ({page}) => {
    await page.getByRole('textbox', { name: "Email" }).first().click();
    await page.getByRole('button', { name: "Sign in" }).first().click();

    await page.getByLabel('Email').first().click();

    await page.getByPlaceholder('Jane Doe').click();
    await page.getByText('Using the Grid').click();
    await page.getByTitle('IoT Dashboard').click();

    await page.getByTestId('sign-in-button').click();
})

test('Locating child elements', async ({page}) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click();
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click();

    await page.locator('nb-card').getByRole('button', { name: "Sign in" }).first().click(); //nb-card is redundant here
    await page.locator('nb-card').nth(3).getByRole('button').click(); //not recommended
})

test('Locating parent elements', async ({page}) => {
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', { name: "Email" }).click();
    await page.locator('nb-card', {has: page.locator('#inputEmail')}).getByRole('textbox', { name: "Email" }).click();

    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', { name: "Email" }).click();
    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', { name: "Password" }).click();

    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"})
    .getByRole('textbox', { name: "Email" }).click();

    await page.locator(':text-is("Using the Grid")').locator('..')  //probably the only case when
    .getByRole('textbox', { name: "Email" }).click();               // you're allowed to use xPath, namely to go exactly one level up the DOM tree
})

test('Reusing locators', async ({page}) => {
    const basicFormCard = page.locator('nb-card').filter({hasText: "Basic form"});
    const emailField = basicFormCard.getByRole('textbox', {name: "Email"});
    const passwordField = basicFormCard.getByRole('textbox', {name: "Password"});
    const signInButton = basicFormCard.getByRole('button');

    await emailField.fill("test@test.com");
    await passwordField.fill("Welcome123");
    await basicFormCard.locator('nb-checkbox').click();
    await signInButton.click();

    await expect(emailField).toHaveValue('test@test.com');
})

test('extracting values', async ({page}) => {
    //single text value
    const basicFormCard = page.locator('nb-card').filter({hasText: "Basic form"});
    const buttonText = await basicFormCard.locator('button').textContent();

    expect(buttonText).toBe('Submit'); // or any other assertion you want to perform

    //all text values
    const allRadioButtonsTexts = await page.locator('nb-radio').allTextContents();

    expect(allRadioButtonsTexts).toContain('Option 1');
    expect(allRadioButtonsTexts).toContain('Option 2');

    //input value
    const emailField = basicFormCard.getByRole('textbox', {name: "Email"});
    await emailField.fill("test@test.com");
    const emailFieldValue = await emailField.inputValue();

    expect(emailFieldValue).toEqual('test@test.com');

    const placeholderValue = await emailField.getAttribute('placeholder');

    expect(placeholderValue).toEqual('Email');
})

test('assertions', async ({page}) => {

    const basicFormButton = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button');

    //general assertions

    const value = 5;
    expect(value).toEqual(5);

    const text = await basicFormButton.textContent();

    expect(text).toEqual('Submit');

    //locator assertion
    await expect(basicFormButton).toHaveText('Submit');

    //soft assertion
    await expect.soft(basicFormButton).toHaveText('Submit'); 
    await basicFormButton.click(); //waits for 30 seconds
})



