import { expect, test } from '@playwright/test';

import type {
  ApiMessageResponse,
  ProductsResponse,
} from '../../../../src/types/api';

test.describe('Product Search API', () => {
  test(
    'API-005 | Search products',
    { tag: ['@api', '@products', '@smoke', '@positive'] },
    async ({ request }) => {
      const searchTerm = 'top';
      const response = await request.post('/api/searchProduct', {
        form: {
          search_product: searchTerm,
        },
      });

      expect(response.status()).toBe(200);

      const body = (await response.json()) as ProductsResponse;
      expect(body.responseCode).toBe(200);
      expect(body.products.length).toBeGreaterThan(0);
      expect(
        body.products.some(({ name }) =>
          name.toLocaleLowerCase().includes(searchTerm),
        ),
      ).toBe(true);
    },
  );

  test(
    'API-006 | Search products without the required parameter',
    { tag: ['@api', '@products', '@negative'] },
    async ({ request }) => {
      const response = await request.post('/api/searchProduct');

      expect(response.status()).toBe(200);

      const body = (await response.json()) as ApiMessageResponse;
      expect(body).toEqual({
        responseCode: 400,
        message:
          'Bad request, search_product parameter is missing in POST request.',
      });
    },
  );
});
