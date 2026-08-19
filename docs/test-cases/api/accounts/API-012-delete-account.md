# API-012 - Delete User Account

- Method: `DELETE`
- Endpoint: `/api/deleteAccount`
- Request data: `email` and `password`
- Expected application response code: `200`
- Expected result: The response confirms that the account was deleted.
- Note: Runs last in the account lifecycle chain and also confirms that a
  follow-up lookup for the deleted email returns `404`.
- Automation status: Automated in Postman and Playwright
- Automation target: `tests/e2e/api/accounts/accounts.api.spec.ts`
