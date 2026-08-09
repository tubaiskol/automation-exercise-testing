import type { Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly loginTitle: Locator;
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginButton: Locator;
  readonly loginErrorMessage: Locator;

  constructor(private readonly page: Page) {
    const loginForm = page.locator('form[action="/login"]');

    this.loginTitle = page.getByRole('heading', {
      name: 'Login to your account',
    });
    this.loginEmailInput = loginForm.getByPlaceholder('Email Address');
    this.loginPasswordInput = loginForm.getByPlaceholder('Password');
    this.loginButton = loginForm.getByRole('button', { name: 'Login' });
    this.loginErrorMessage = loginForm.getByText(
      'Your email or password is incorrect!',
    );
  }

  async goto(): Promise<void> {
    await this.page.goto('/login');
  }

  async login(email: string, password: string): Promise<void> {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
  }
}
