import { expect, test } from '@playwright/test';

import type {
  ApiMessageResponse,
  ProductsResponse,
} from '../../../../src/types/api';

test.describe('Products API', () => {
  test(
    'API-001 | Get all products list',
    { tag: ['@api', '@products', '@smoke', '@positive'] },
    async ({ request }) => {
      const response = await request.get('/api/productsList');

      expect(response.status()).toBe(200);

      const body = (await response.json()) as ProductsResponse;
      expect(body.responseCode).toBe(200);
      expect(body.products.length).toBeGreaterThan(0);
      expect(body.products[0]).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          price: expect.any(String),
          brand: expect.any(String),
        }),
      );
    },
  );

  test(
    'API-002 | POST to all products list',
    { tag: ['@api', '@products', '@negative'] },
    async ({ request }) => {
      const response = await request.post('/api/productsList');

      expect(response.status()).toBe(200);

      const body = (await response.json()) as ApiMessageResponse;
      expect(body).toEqual({
        responseCode: 405,
        message: 'This request method is not supported.',
      });
    },
  );
});
