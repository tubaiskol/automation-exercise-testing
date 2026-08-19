import { expect, test } from '@playwright/test';

import type {
  ApiMessageResponse,
  BrandsResponse,
} from '../../../../src/types/api';

test.describe('Brands API', () => {
  test(
    'API-003 | Get all brands list',
    { tag: ['@api', '@products', '@smoke', '@positive'] },
    async ({ request }) => {
      const response = await request.get('/api/brandsList');

      expect(response.status()).toBe(200);

      const body = (await response.json()) as BrandsResponse;
      expect(body.responseCode).toBe(200);
      expect(body.brands.length).toBeGreaterThan(0);
      expect(body.brands[0]).toEqual({
        id: expect.any(Number),
        brand: expect.any(String),
      });
    },
  );

  test(
    'API-004 | PUT to all brands list',
    { tag: ['@api', '@products', '@negative'] },
    async ({ request }) => {
      const response = await request.put('/api/brandsList');

      expect(response.status()).toBe(200);

      const body = (await response.json()) as ApiMessageResponse;
      expect(body).toEqual({
        responseCode: 405,
        message: 'This request method is not supported.',
      });
    },
  );
});
