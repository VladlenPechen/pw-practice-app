import {test} from '../test-options';
import { PageManager } from '../page-objects/pageManager';
import {faker} from '@faker-js/faker';

test('parameterized methods', async ({pageManager}) => {

    const randomFullName = faker.person.fullName();
    const randomEmail = `${randomFullName.replace(/\s+/g, '').toLowerCase()}${faker.number.int(1000)}@test.com`

    await pageManager.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.USERNAME, process.env.PASSWORD, 'Option 1');
    await pageManager.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, false);

})
