import type { Locator, Page } from '@playwright/test';

export class Header {
  readonly homeLink: Locator;
  readonly productsLink: Locator;
  readonly cartLink: Locator;
  readonly signupLoginLink: Locator;
  readonly logoutLink: Locator;
  readonly loggedInAsLink: Locator;

  constructor(page: Page) {
    this.homeLink = page.getByRole('link', { name: 'Home', exact: true });
    this.productsLink = page.getByRole('link', { name: /Products/i });
    this.cartLink = page.getByRole('link', { name: /Cart/i });
    this.signupLoginLink = page.getByRole('link', { name: /Signup \/ Login/i });
    this.logoutLink = page.getByRole('link', { name: /Logout/i });
    this.loggedInAsLink = page.getByRole('link', { name: /Logged in as/i });
  }
}
