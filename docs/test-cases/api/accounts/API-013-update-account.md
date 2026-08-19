# API-013 - Update User Account

- Method: `PUT`
- Endpoint: `/api/updateAccount`
- Request data: Complete updated user data
- Expected application response code: `200`
- Expected result: The response confirms that the user was updated.
- Note: Reuses the email created by API-011 and changes the profile values that
  API-014 then reads back.
- Automation status: Automated in Postman and Playwright
- Automation target: `tests/e2e/api/accounts/accounts.api.spec.ts`
