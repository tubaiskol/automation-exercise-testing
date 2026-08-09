# TC-002 - Login User with Valid Credentials

## Test Information

| Field | Value |
|---|---|
| Test Case ID | TC-002 |
| Feature | Authentication |
| Scenario | Login with valid credentials |
| Priority | High |
| Test Type | Functional / Positive |
| Automation Status | Automated |

## Preconditions

- The user has an existing account.
- The user is on the Automation Exercise website.

## Test Data

| Field | Value |
|---|---|
| Email | Valid registered email from `TEST_USER_EMAIL` |
| Password | Valid password from `TEST_USER_PASSWORD` |

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Navigate to the Signup / Login page | The login page is displayed |
| 2 | Verify the "Login to your account" section | The login form is visible |
| 3 | Enter a valid email address | The email is entered |
| 4 | Enter the matching password | The password is entered |
| 5 | Click "Login" | The user is authenticated |
| 6 | Verify the logged-in indicator | "Logged in as..." is displayed |
| 7 | Click "Logout" | The user returns to the login page |

## Expected Result

The user can log in with valid credentials and log out successfully.

## Automation

Automated in `tests/e2e/authentication/login.spec.ts`.
