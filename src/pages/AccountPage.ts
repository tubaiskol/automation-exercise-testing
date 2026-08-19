import { expect, type Locator, type Page } from '@playwright/test';

import { BasePage } from './BasePage';

/**
 * The two account confirmation screens, which share the same layout and the
 * same Continue button:
 *
 * - `/account_created` — "Account Created!" after registration (TC-001)
 * - `/delete_account`  — "Account Deleted!" after removal (TC-001, TC-004)
 *
 * `goto()` is intentionally not used for these: they are outcomes of a flow,
 * never destinations you navigate to directly.
 */
export class AccountPage extends BasePage {
  readonly accountCreatedHeading: Locator;
  readonly accountDeletedHeading: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    super(page, '/account_created');

    this.accountCreatedHeading = page.locator('[data-qa="account-created"]');
    this.accountDeletedHeading = page.locator('[data-qa="account-deleted"]');
    this.continueButton = page.locator('[data-qa="continue-button"]');
  }

  // --- actions -------------------------------------------------------------

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  /** Confirms registration, then continues into the signed-in session. */
  async continueAfterAccountCreated(): Promise<void> {
    await this.expectAccountCreated();
    await this.clickContinue();
  }

  /** Confirms deletion, then continues back to the signed-out home page. */
  async continueAfterAccountDeleted(): Promise<void> {
    await this.expectAccountDeleted();
    await this.clickContinue();
  }

  // --- assertions ----------------------------------------------------------

  /** Either confirmation screen is considered loaded. */
  async expectLoaded(): Promise<void> {
    await expect(
      this.accountCreatedHeading.or(this.accountDeletedHeading),
    ).toBeVisible();
    await expect(this.continueButton).toBeVisible();
  }

  async expectAccountCreated(): Promise<void> {
    await expect(this.accountCreatedHeading).toBeVisible();
    await expect(this.accountCreatedHeading).toHaveText('Account Created!');
    await expect(this.continueButton).toBeVisible();
  }

  async expectAccountDeleted(): Promise<void> {
    await expect(this.accountDeletedHeading).toBeVisible();
    await expect(this.accountDeletedHeading).toHaveText('Account Deleted!');
    await expect(this.continueButton).toBeVisible();
  }
}
