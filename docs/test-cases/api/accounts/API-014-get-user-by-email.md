# API-014 - Get User Details by Email

- Method: `GET`
- Endpoint: `/api/getUserDetailByEmail`
- Request data: `email`
- Expected application response code: `200`
- Expected result: The response contains the requested user details.
- Note: Asserts the values written by API-013, so it doubles as the persistence
  check for the update endpoint.
- Automation status: Automated in Postman and Playwright
- Automation target: `tests/e2e/api/accounts/accounts.api.spec.ts`
