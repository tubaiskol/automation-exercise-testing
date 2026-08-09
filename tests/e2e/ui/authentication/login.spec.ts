import { invalidUser, getTestUser } from '../../../../src/data/users';
import { expect, test } from '../../../../src/fixtures/testFixtures';

test.describe('Authentication - Login', () => {
  test(
    'TC-002 | Login user with valid credentials',
    { tag: ['@authentication', '@smoke', '@positive'] },
    async ({ homePage, loginPage }) => {
      const testUser = getTestUser();
      test.skip(
        !testUser,
        'Set TEST_USER_EMAIL and TEST_USER_PASSWORD in .env to run this test.',
      );

      if (!testUser) {
        return;
      }

      await test.step('Open the login page', async () => {
        await loginPage.goto();
        await expect(loginPage.loginTitle).toBeVisible();
      });

      await test.step('Submit valid credentials', async () => {
        await loginPage.login(testUser.email, testUser.password);
      });

      await test.step('Verify that the user is logged in', async () => {
        await expect(homePage.header.loggedInAsLink).toBeVisible();
      });

      await test.step('Log out to restore the test state', async () => {
        await homePage.header.logoutLink.click();
        await expect(loginPage.loginTitle).toBeVisible();
      });
    },
  );

  test(
    'TC-003 | Login user with invalid credentials',
    { tag: ['@authentication', '@negative', '@regression'] },
    async ({ loginPage }) => {
      await test.step('Open the login page', async () => {
        await loginPage.goto();
        await expect(loginPage.loginTitle).toBeVisible();
      });

      await test.step('Submit invalid credentials', async () => {
        await loginPage.login(invalidUser.email, invalidUser.password);
      });

      await test.step('Verify the login error', async () => {
        await expect(loginPage.loginErrorMessage).toHaveText(
          'Your email or password is incorrect!',
        );
      });
    },
  );
});
