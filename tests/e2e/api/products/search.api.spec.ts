import { expect, test } from '@playwright/test';

type SearchResponse = {
  responseCode: number;
  products: Array<{
    name: string;
  }>;
};

type ErrorResponse = {
  responseCode: number;
  message: string;
};

test.describe('Product Search API', () => {
  test('API-005 | Search products', async ({ request }) => {
    const searchTerm = 'top';
    const response = await request.post('/api/searchProduct', {
      form: {
        search_product: searchTerm,
      },
    });

    expect(response.status()).toBe(200);

    const body = (await response.json()) as SearchResponse;
    expect(body.responseCode).toBe(200);
    expect(body.products.length).toBeGreaterThan(0);
    expect(
      body.products.some(({ name }) =>
        name.toLocaleLowerCase().includes(searchTerm),
      ),
    ).toBe(true);
  });

  test(
    'API-006 | Search products without the required parameter',
    async ({ request }) => {
      const response = await request.post('/api/searchProduct');

      expect(response.status()).toBe(200);

      const body = (await response.json()) as ErrorResponse;
      expect(body).toEqual({
        responseCode: 400,
        message:
          'Bad request, search_product parameter is missing in POST request.',
      });
    },
  );
});
