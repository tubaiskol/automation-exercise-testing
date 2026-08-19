# API-011 - Create User Account

- Method: `POST`
- Endpoint: `/api/createAccount`
- Request data: Complete user registration data
- Expected application response code: `201`
- Expected result: The response confirms that the user was created.
- Note: Runs first in the account lifecycle chain and generates a unique email.
- Automation status: Automated in Postman and Playwright
- Automation target: `tests/e2e/api/accounts/accounts.api.spec.ts`
