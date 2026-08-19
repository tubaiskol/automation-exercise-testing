import { expect, type Locator, type Page } from '@playwright/test';

/**
 * The site-wide navigation bar.
 *
 * Locators are anchored to the `href` of each nav item rather than to its text.
 * The visible labels are prefixed by Font Awesome icons whose glyphs leak into
 * the accessible name, so `getByRole('link', { name: 'Home', exact: true })`
 * matches nothing. Scoping by URL inside the nav container is both exact and
 * resilient to copy changes.
 */
export class Header {
  private readonly nav: Locator;

  readonly logo: Locator;
  readonly homeLink: Locator;
  readonly productsLink: Locator;
  readonly cartLink: Locator;
  readonly signupLoginLink: Locator;
  readonly testCasesLink: Locator;
  readonly apiTestingLink: Locator;
  readonly videoTutorialsLink: Locator;
  readonly contactUsLink: Locator;
  readonly logoutLink: Locator;
  readonly deleteAccountLink: Locator;
  readonly loggedInAs: Locator;

  constructor(private readonly page: Page) {
    this.nav = page.locator('.shop-menu ul.nav');

    this.logo = page.locator('.logo a');
    this.homeLink = this.nav.locator('a[href="/"]');
    this.productsLink = this.nav.locator('a[href="/products"]');
    this.cartLink = this.nav.locator('a[href="/view_cart"]');
    this.signupLoginLink = this.nav.locator('a[href="/login"]');
    this.testCasesLink = this.nav.locator('a[href="/test_cases"]');
    this.apiTestingLink = this.nav.locator('a[href="/api_list"]');
    this.videoTutorialsLink = this.nav.locator('a[href*="youtube.com"]');
    this.contactUsLink = this.nav.locator('a[href="/contact_us"]');
    this.logoutLink = this.nav.locator('a[href="/logout"]');
    this.deleteAccountLink = this.nav.locator('a[href="/delete_account"]');

    // "Logged in as <name>" is an anchor without an href, so it exposes no ARIA
    // link role. It has to be matched as plain text inside the nav list.
    this.loggedInAs = this.nav.locator('li a:has-text("Logged in as")');
  }

  // --- actions -------------------------------------------------------------

  async goToHome(): Promise<void> {
    await this.homeLink.click();
  }

  async goToProducts(): Promise<void> {
    await this.productsLink.click();
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }

  async goToSignupLogin(): Promise<void> {
    await this.signupLoginLink.click();
  }

  async goToTestCases(): Promise<void> {
    await this.testCasesLink.click();
  }

  async goToContactUs(): Promise<void> {
    await this.contactUsLink.click();
  }

  async logout(): Promise<void> {
    await this.logoutLink.click();
    await this.page.waitForURL('**/login');
  }

  async deleteAccount(): Promise<void> {
    await this.deleteAccountLink.click();
    await this.page.waitForURL('**/delete_account');
  }

  /** Reads the display name shown next to "Logged in as". */
  async getLoggedInUsername(): Promise<string> {
    const label = (await this.loggedInAs.innerText()).trim();
    return label.replace(/^Logged in as\s*/i, '');
  }

  // --- assertions ----------------------------------------------------------

  async expectVisible(): Promise<void> {
    await expect(this.nav).toBeVisible();
    await expect(this.homeLink).toBeVisible();
  }

  /** Asserts a session is active, and optionally that it belongs to `username`. */
  async expectLoggedIn(username?: string): Promise<void> {
    await expect(this.loggedInAs).toBeVisible();
    await expect(this.logoutLink).toBeVisible();
    await expect(this.deleteAccountLink).toBeVisible();

    if (username !== undefined) {
      await expect(this.loggedInAs).toContainText(username);
    }
  }

  async expectLoggedOut(): Promise<void> {
    await expect(this.signupLoginLink).toBeVisible();
    await expect(this.loggedInAs).toBeHidden();
    await expect(this.logoutLink).toBeHidden();
  }

  /** Every nav item that is present whether or not a user is signed in. */
  async expectGuestNavigationVisible(): Promise<void> {
    await expect(this.homeLink).toBeVisible();
    await expect(this.productsLink).toBeVisible();
    await expect(this.cartLink).toBeVisible();
    await expect(this.testCasesLink).toBeVisible();
    await expect(this.apiTestingLink).toBeVisible();
    await expect(this.contactUsLink).toBeVisible();
  }
}
