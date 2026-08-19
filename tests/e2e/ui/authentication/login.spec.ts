import { invalidUser, getTestUser } from '../../../../src/data/users';
import { test } from '../../../../src/fixtures/testFixtures';

test.describe('Authentication - Login', () => {
  test(
    'TC-002 | Login user with valid credentials',
    { tag: ['@ui', '@authentication', '@smoke', '@positive'] },
    async ({ loginPage }) => {
      const testUser = getTestUser();
      test.skip(
        !testUser,
        'Set TEST_USER_EMAIL and TEST_USER_PASSWORD in .env to run this test.',
      );

      if (!testUser) {
        return;
      }

      await test.step('Open the login page', async () => {
        await loginPage.open();
        await loginPage.expectLoginFormVisible();
      });

      await test.step('Submit valid credentials', async () => {
        await loginPage.login(testUser);
      });

      await test.step('Verify that the user is logged in', async () => {
        await loginPage.header.expectLoggedIn();
      });

      await test.step('Log out to restore the test state', async () => {
        await loginPage.header.logout();
        await loginPage.expectLoginFormVisible();
      });
    },
  );

  test(
    'TC-003 | Login user with invalid credentials',
    { tag: ['@ui', '@authentication', '@negative', '@regression'] },
    async ({ loginPage }) => {
      await test.step('Open the login page', async () => {
        await loginPage.open();
        await loginPage.expectLoginFormVisible();
      });

      await test.step('Submit invalid credentials', async () => {
        await loginPage.login(invalidUser);
      });

      await test.step('Verify the login error', async () => {
        await loginPage.expectLoginError();
        await loginPage.header.expectLoggedOut();
      });
    },
  );
});

test.describe('Navigation - Header and Footer', () => {
  test(
    'Header and footer render on the home page',
    { tag: ['@ui', '@navigation', '@smoke'] },
    async ({ homePage }) => {
      await homePage.open();

      await test.step('Verify the guest navigation', async () => {
        await homePage.header.expectGuestNavigationVisible();
        await homePage.header.expectLoggedOut();
      });

      await test.step('Verify the footer', async () => {
        await homePage.footer.scrollToFooter();
        await homePage.footer.expectSubscriptionFormVisible();
        await homePage.footer.expectCopyrightVisible();
      });
    },
  );
});
