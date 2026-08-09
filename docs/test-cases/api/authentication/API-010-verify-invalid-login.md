# API-010 - Verify Login with Invalid Details

- Method: `POST`
- Endpoint: `/api/verifyLogin`
- Request data: Invalid `email` and `password`
- Expected application response code: `404`
- Expected result: The response states that the user was not found.
- Automation status: Planned
- Automation target: `tests/e2e/api/authentication/verify-login.api.spec.ts`
