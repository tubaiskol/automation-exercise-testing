import { expect, type Locator, type Page } from '@playwright/test';

import type { Credentials } from '../types/testData';
import { BasePage } from './BasePage';

/**
 * `/login` hosts two independent forms side by side: "Login to your account"
 * and "New User Signup!". Both live here, and every locator is scoped to its
 * own `<form>` so the two "Email Address" fields never collide.
 *
 * The `data-qa` attributes are the site's own test hooks, which makes them the
 * most stable selectors available on this page.
 */
export class LoginPage extends BasePage {
  private readonly loginForm: Locator;
  private readonly signupForm: Locator;

  readonly loginHeading: Locator;
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginButton: Locator;
  readonly loginErrorMessage: Locator;

  readonly signupHeading: Locator;
  readonly signupNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupButton: Locator;
  readonly signupErrorMessage: Locator;

  constructor(page: Page) {
    super(page, '/login');

    this.loginForm = page.locator('form[action="/login"]');
    this.signupForm = page.locator('form[action="/signup"]');

    this.loginHeading = page.getByRole('heading', {
      name: 'Login to your account',
    });
    this.loginEmailInput = this.loginForm.locator('[data-qa="login-email"]');
    this.loginPasswordInput = this.loginForm.locator(
      '[data-qa="login-password"]',
    );
    this.loginButton = this.loginForm.locator('[data-qa="login-button"]');
    this.loginErrorMessage = this.loginForm.locator('p[style*="color: red"]');

    this.signupHeading = page.getByRole('heading', { name: 'New User Signup!' });
    this.signupNameInput = this.signupForm.locator('[data-qa="signup-name"]');
    this.signupEmailInput = this.signupForm.locator('[data-qa="signup-email"]');
    this.signupButton = this.signupForm.locator('[data-qa="signup-button"]');
    this.signupErrorMessage = this.signupForm.locator('p[style*="color: red"]');
  }

  // --- actions -------------------------------------------------------------

  /** Fills the login form without submitting, for field-level assertions. */
  async fillLoginForm({ email, password }: Credentials): Promise<void> {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
  }

  async login(credentials: Credentials): Promise<void> {
    await this.fillLoginForm(credentials);
    await this.loginButton.click();
  }

  /** Logs in and waits until the header confirms an active session. */
  async loginAsExistingUser(credentials: Credentials): Promise<void> {
    await this.login(credentials);
    await this.header.expectLoggedIn();
  }

  /** Fills the signup form without submitting. */
  async fillSignupForm(name: string, email: string): Promise<void> {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
  }

  /**
   * Starts registration. On success the browser lands on `/signup`, which is
   * modelled by {@link SignupPage}; on a duplicate email it stays here and
   * renders {@link signupErrorMessage}.
   */
  async startSignup(name: string, email: string): Promise<void> {
    await this.fillSignupForm(name, email);
    await this.signupButton.click();
  }

  // --- assertions ----------------------------------------------------------

  async expectLoaded(): Promise<void> {
    await expect(this.loginHeading).toBeVisible();
    await expect(this.signupHeading).toBeVisible();
  }

  async expectLoginFormVisible(): Promise<void> {
    await expect(this.loginHeading).toHaveText('Login to your account');
    await expect(this.loginEmailInput).toBeVisible();
    await expect(this.loginPasswordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async expectSignupFormVisible(): Promise<void> {
    await expect(this.signupHeading).toHaveText('New User Signup!');
    await expect(this.signupNameInput).toBeVisible();
    await expect(this.signupEmailInput).toBeVisible();
    await expect(this.signupButton).toBeVisible();
  }

  /** TC-003: credentials the site does not recognise. */
  async expectLoginError(): Promise<void> {
    await expect(this.loginErrorMessage).toHaveText(
      'Your email or password is incorrect!',
    );
  }

  /** TC-005: registering with an address that is already taken. */
  async expectEmailAlreadyExistsError(): Promise<void> {
    await expect(this.signupErrorMessage).toHaveText(
      'Email Address already exist!',
    );
  }

  async expectNoLoginError(): Promise<void> {
    await expect(this.loginErrorMessage).toBeHidden();
  }

  /** Both fields are `required`, so the browser blocks an empty submit. */
  async expectLoginFieldsAreRequired(): Promise<void> {
    await expect(this.loginEmailInput).toHaveAttribute('required', '');
    await expect(this.loginPasswordInput).toHaveAttribute('required', '');
  }
}
