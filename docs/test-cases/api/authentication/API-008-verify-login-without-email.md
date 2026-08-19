# API-008 - Verify Login Without Email

- Method: `POST`
- Endpoint: `/api/verifyLogin`
- Request data: `password` only
- Expected application response code: `400`
- Expected result: The response identifies the missing login parameter.
- Automation status: Automated in Postman and Playwright
- Automation target: `tests/e2e/api/authentication/verify-login.api.spec.ts`
