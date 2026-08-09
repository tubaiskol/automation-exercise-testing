import type { Page } from '@playwright/test';

import { Header } from '../components/Header';

export class HomePage {
  readonly header: Header;

  constructor(private readonly page: Page) {
    this.header = new Header(page);
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }
}
