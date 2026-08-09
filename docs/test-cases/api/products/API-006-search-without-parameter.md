# API-006 - Search Product Without Required Parameter

- Method: `POST`
- Endpoint: `/api/searchProduct`
- Request data: The `search_product` field is omitted.
- Expected application response code: `400`
- Expected result: The response identifies the missing parameter.
- Automation status: Automated in Postman and Playwright
- Automation target: `tests/e2e/api/products/search.api.spec.ts`
