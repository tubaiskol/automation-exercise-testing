import { test as base, expect } from '@playwright/test';

import { AccountsApi } from '../api/AccountsApi';
import { AuthApi } from '../api/AuthApi';
import type { AccountPayload } from '../types/api';
import { createAccountPayload } from '../utils/dataFactory';

type ApiFixtures = {
  accountsApi: AccountsApi;
  authApi: AuthApi;
  registeredAccount: AccountPayload;
};

export const test = base.extend<ApiFixtures>({
  accountsApi: async ({ request }, use) => {
    await use(new AccountsApi(request));
  },

  authApi: async ({ request }, use) => {
    await use(new AuthApi(request));
  },

  // The registeredAccount fixture creates a new account for each test that needs it, and deletes it afterward.
  registeredAccount: async ({ accountsApi }, use) => {
    const account = createAccountPayload();

    const response = await accountsApi.createAccount(account);
    expect(
      (await response.json()).responseCode,
      'the account fixture failed to provision a user',
    ).toBe(201);

    await use(account);

    await accountsApi.deleteAccount({
      email: account.email,
      password: account.password,
    });
  },
});

export { expect };
