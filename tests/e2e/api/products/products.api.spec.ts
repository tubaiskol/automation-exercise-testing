import { expect, test } from '@playwright/test';

type ProductsResponse = {
  responseCode: number;
  products: Array<{
    id: number;
    name: string;
    price: string;
    brand: string;
  }>;
};

type ErrorResponse = {
  responseCode: number;
  message: string;
};

test.describe('Products API', () => {
  test('API-001 | Get all products list', async ({ request }) => {
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
  });

  test('API-002 | POST to all products list', async ({ request }) => {
    const response = await request.post('/api/productsList');

    expect(response.status()).toBe(200);

    const body = (await response.json()) as ErrorResponse;
    expect(body).toEqual({
      responseCode: 405,
      message: 'This request method is not supported.',
    });
  });
});
