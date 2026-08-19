import { expect, type Locator, type Page } from '@playwright/test';

import { BasePage } from './BasePage';

/** The landing page at `/`. */
export class HomePage extends BasePage {
  readonly slider: Locator;
  readonly featuresItems: Locator;

  constructor(page: Page) {
    super(page, '/');

    this.slider = page.locator('#slider');
    this.featuresItems = page.locator('.features_items');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.slider).toBeVisible();
    await this.header.expectVisible();
  }
}
