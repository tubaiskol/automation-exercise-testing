# API-007 - Verify Login with Valid Details

- Method: `POST`
- Endpoint: `/api/verifyLogin`
- Request data: Valid `email` and `password`
- Expected application response code: `200`
- Expected result: The response states that the user exists.
- Test data: The Playwright test provisions a throwaway account through the
  `registeredAccount` fixture and deletes it afterwards, so no shared
  credentials are required. Postman uses `testUserEmail` / `testUserPassword`.
- Automation status: Automated in Postman and Playwright
- Automation target: `tests/e2e/api/authentication/verify-login.api.spec.ts`
