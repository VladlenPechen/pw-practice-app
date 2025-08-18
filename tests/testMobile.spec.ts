import {test, expect} from "@playwright/test"


test('input fields', async ({ page }, testInfo) => {
        if(testInfo.retry > 0) {
            //do somthing e.g. cleanup
        }
        const isMobileView =  testInfo.project.name == 'mobile'
        await page.goto('/');
        if (isMobileView) await page.locator('.sidebar-toggle').click();
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
        if (isMobileView) await page.locator('.sidebar-toggle').click();
        const usingGridEmailInput = page.locator('nb-card', {hasText: 'Using the Grid'})
            .getByRole('textbox', {name: "Email"}); 
        await usingGridEmailInput.fill("test@test.com");
        await usingGridEmailInput.clear();
        await usingGridEmailInput.pressSequentially('test2@test.com'); // delay between key presses

        //generic assertion
        const inputValue = await usingGridEmailInput.inputValue();
        expect(inputValue).toEqual('test2@test.com');

        //locator assertion
        await expect(usingGridEmailInput).toHaveValue('test2@test.com');
})