import { expect, type Page } from '@playwright/test';

import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

/**
 * Shared behaviour for every page object: navigation to its own path and the
 * two components that appear on every screen. Subclasses declare their own
 * locators and implement `expectLoaded` with whatever proves the page arrived.
 */
export abstract class BasePage {
  readonly header: Header;
  readonly footer: Footer;

  protected constructor(
    protected readonly page: Page,
    /** Path relative to `baseURL`, e.g. `/login`. */
    protected readonly path: string,
  ) {
    this.header = new Header(page);
    this.footer = new Footer(page);
  }

  async goto(): Promise<void> {
    await this.page.goto(this.path);
  }

  /** Navigates to the page and waits until it is demonstrably loaded. */
  async open(): Promise<void> {
    await this.goto();
    await this.expectLoaded();
  }

  /** Proves the browser is on this page. Implemented by each subclass. */
  abstract expectLoaded(): Promise<void>;

  async expectUrlPath(expectedPath: string = this.path): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`${expectedPath}/?$`));
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }
}
