import { AccountsApi } from '../../../../src/api/AccountsApi';
import { expect, test } from '../../../../src/fixtures/apiFixtures';
import type {
  AccountPayload,
  ApiMessageResponse,
  UserDetailsResponse,
} from '../../../../src/types/api';
import { createAccountPayload } from '../../../../src/utils/dataFactory';

// Set the test.describe mode to serial so that the account created by API-011 to prevent
// it from being deleted by API-012.
test.describe.configure({ mode: 'serial' });

test.describe('Accounts API', () => {
  let account: AccountPayload;
  let updatedAccount: AccountPayload;

  test.beforeAll(() => {
    account = createAccountPayload();
    updatedAccount = createAccountPayload({
      email: account.email,
      password: account.password,
      name: 'Tuba QA Updated',
      firstname: 'Updated',
      lastname: 'Profile',
      company: 'QA Practice Updated',
      address1: '456 Updated Street',
      city: 'Istanbul',
    });
  });

  // Safety net: if an assertion fails before API-012 runs, the account created
  // by API-011 would otherwise stay behind on the shared practice environment.
  test.afterAll(async ({ playwright }) => {
    const context = await playwright.request.newContext({
      baseURL: test.info().project.use.baseURL,
    });

    await new AccountsApi(context).deleteAccount({
      email: account.email,
      password: account.password,
    });
    await context.dispose();
  });

  test(
    'API-011 | Create a user account',
    { tag: ['@api', '@accounts', '@smoke', '@positive'] },
    async ({ accountsApi }) => {
      const response = await accountsApi.createAccount(account);

      expect(response.status()).toBe(200);

      const body = (await response.json()) as ApiMessageResponse;
      expect(body).toEqual({
        responseCode: 201,
        message: 'User created!',
      });
    },
  );

  test(
    'API-013 | Update a user account',
    { tag: ['@api', '@accounts', '@positive'] },
    async ({ accountsApi }) => {
      const response = await accountsApi.updateAccount(updatedAccount);

      expect(response.status()).toBe(200);

      const body = (await response.json()) as ApiMessageResponse;
      expect(body).toEqual({
        responseCode: 200,
        message: 'User updated!',
      });
    },
  );

  test(
    'API-014 | Get user details by email',
    { tag: ['@api', '@accounts', '@positive'] },
    async ({ accountsApi }) => {
      const response = await accountsApi.getUserDetailByEmail(account.email);

      expect(response.status()).toBe(200);

      const body = (await response.json()) as UserDetailsResponse;
      expect(body.responseCode).toBe(200);

      // The returned profile must reflect the values sent by API-013, which
      // makes this scenario the persistence check for the update endpoint.
      expect(body.user).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          email: account.email,
          name: updatedAccount.name,
          first_name: updatedAccount.firstname,
          last_name: updatedAccount.lastname,
          company: updatedAccount.company,
          address1: updatedAccount.address1,
          city: updatedAccount.city,
        }),
      );
    },
  );

  test(
    'API-012 | Delete a user account',
    { tag: ['@api', '@accounts', '@positive'] },
    async ({ accountsApi }) => {
      const response = await accountsApi.deleteAccount({
        email: account.email,
        password: account.password,
      });

      expect(response.status()).toBe(200);

      const body = (await response.json()) as ApiMessageResponse;
      expect(body).toEqual({
        responseCode: 200,
        message: 'Account deleted!',
      });

      const lookup = await accountsApi.getUserDetailByEmail(account.email);
      const lookupBody = (await lookup.json()) as ApiMessageResponse;
      expect(lookupBody).toEqual({
        responseCode: 404,
        message: 'Account not found with this email, try another email!',
      });
    },
  );
});
