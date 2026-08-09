# API-007 - Verify Login with Valid Details

- Method: `POST`
- Endpoint: `/api/verifyLogin`
- Request data: Valid `email` and `password`
- Expected application response code: `200`
- Expected result: The response states that the user exists.
- Automation status: Planned
- Automation target: `tests/e2e/api/authentication/verify-login.api.spec.ts`
