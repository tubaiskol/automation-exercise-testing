import { expect, type Locator, type Page } from '@playwright/test';

/**
 * The site-wide footer, which owns the newsletter subscription widget used by
 * TC-010 and TC-011, plus the scroll-to-top arrow used by TC-025.
 */
export class Footer {
  private readonly footer: Locator;

  readonly subscriptionHeading: Locator;
  readonly subscriptionEmailInput: Locator;
  readonly subscribeButton: Locator;
  readonly subscriptionSuccessMessage: Locator;
  readonly copyrightText: Locator;
  readonly scrollUpButton: Locator;

  constructor(private readonly page: Page) {
    this.footer = page.locator('#footer');

    this.subscriptionHeading = this.footer.getByRole('heading', {
      name: 'Subscription',
    });
    // `susbscribe_email` is the site's own spelling of the id, not a typo here.
    this.subscriptionEmailInput = this.footer.locator('#susbscribe_email');
    this.subscribeButton = this.footer.locator('#subscribe');
    this.subscriptionSuccessMessage = this.footer.locator(
      '#success-subscribe .alert-success',
    );
    this.copyrightText = this.footer.locator('.footer-bottom p');

    // Injected by the site's JavaScript once the page has been scrolled down,
    // so it is absent from the initial DOM.
    this.scrollUpButton = page.locator('#scrollUp');
  }

  // --- actions -------------------------------------------------------------

  async subscribe(email: string): Promise<void> {
    await this.subscriptionEmailInput.fill(email);
    await this.subscribeButton.click();
  }

  async scrollToFooter(): Promise<void> {
    await this.footer.scrollIntoViewIfNeeded();
  }

  /** Scrolls to the bottom, then returns to the top using the arrow button. */
  async scrollToTopWithArrow(): Promise<void> {
    await this.scrollToFooter();
    await this.scrollUpButton.click();
  }

  /** Returns to the top without the arrow, for the TC-026 variant. */
  async scrollToTopWithoutArrow(): Promise<void> {
    await this.page.keyboard.press('Control+Home');
  }

  // --- assertions ----------------------------------------------------------

  async expectVisible(): Promise<void> {
    await expect(this.footer).toBeVisible();
    await expect(this.subscriptionHeading).toBeVisible();
  }

  async expectSubscriptionFormVisible(): Promise<void> {
    await expect(this.subscriptionHeading).toBeVisible();
    await expect(this.subscriptionEmailInput).toBeVisible();
    await expect(this.subscribeButton).toBeVisible();
  }

  async expectSubscriptionSuccess(): Promise<void> {
    await expect(this.subscriptionSuccessMessage).toBeVisible();
    await expect(this.subscriptionSuccessMessage).toHaveText(
      'You have been successfully subscribed!',
    );
  }

  async expectCopyrightVisible(): Promise<void> {
    await expect(this.copyrightText).toContainText('Copyright');
  }
}
