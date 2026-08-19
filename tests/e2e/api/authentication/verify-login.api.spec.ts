import { invalidUser } from '../../../../src/data/users';
import { expect, test } from '../../../../src/fixtures/apiFixtures';
import type { ApiMessageResponse } from '../../../../src/types/api';

test.describe('Authentication API', () => {
  test(
    'API-007 | Verify login with valid details',
    { tag: ['@api', '@authentication', '@smoke', '@positive'] },
    async ({ authApi, registeredAccount }) => {
      const response = await authApi.verifyLogin({
        email: registeredAccount.email,
        password: registeredAccount.password,
      });

      expect(response.status()).toBe(200);

      const body = (await response.json()) as ApiMessageResponse;
      expect(body).toEqual({
        responseCode: 200,
        message: 'User exists!',
      });
    },
  );

  test(
    'API-008 | Verify login without an email parameter',
    { tag: ['@api', '@authentication', '@negative'] },
    async ({ authApi }) => {
      const response = await authApi.verifyLoginWithoutEmail(
        invalidUser.password,
      );

      expect(response.status()).toBe(200);

      const body = (await response.json()) as ApiMessageResponse;
      expect(body).toEqual({
        responseCode: 400,
        message:
          'Bad request, email or password parameter is missing in POST request.',
      });
    },
  );

  test(
    'API-009 | Send DELETE to the verify-login endpoint',
    { tag: ['@api', '@authentication', '@negative'] },
    async ({ authApi }) => {
      const response = await authApi.deleteVerifyLogin();

      expect(response.status()).toBe(200);

      const body = (await response.json()) as ApiMessageResponse;
      expect(body).toEqual({
        responseCode: 405,
        message: 'This request method is not supported.',
      });
    },
  );

  test(
    'API-010 | Verify login with invalid details',
    { tag: ['@api', '@authentication', '@negative'] },
    async ({ authApi }) => {
      const response = await authApi.verifyLogin(invalidUser);

      expect(response.status()).toBe(200);

      const body = (await response.json()) as ApiMessageResponse;
      expect(body).toEqual({
        responseCode: 404,
        message: 'User not found!',
      });
    },
  );
});
