import {test, expect} from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';
import {faker} from '@faker-js/faker';

test.beforeEach(async ({page}) => {
    
    await page.goto('/');

})


test('navigate page object @smoke @regression', async ({page}) => {
    const pm = new PageManager(page);
    await pm.navigateTo().formLayoutsPage();
    pm.onDatePickerPage();
    pm.onFormLayoutsPage();
    pm.onDatePickerPage();
    pm.onFormLayoutsPage();
})

test('parameterized methods @smoke', async ({page}) => {
    const pm = new PageManager(page);

    const randomFullName = faker.person.fullName();
    const randomEmail = `${randomFullName.replace(/\s+/g, '').toLowerCase()}${faker.number.int(1000)}@test.com`

    await pm.navigateTo().formLayoutsPage();
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.USERNAME, process.env.PASSWORD, 'Option 1');

    //whole page screenshot
    await page.screenshot({path: "screenshots/form-layouts.png"})
    const buffer = await page.screenshot();
    console.log(buffer.toString('base64'));

    await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, false);

    //particular element's screenshot
    await page.locator('nb-card', {hasText: "Inline form"}).screenshot({path: "screenshots/inline-form.png"});
    await pm.navigateTo().datePickerPage();
    await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(10);
    await pm.onDatePickerPage().selectDatePickerWithRangeFromToday(5, 10);
})
