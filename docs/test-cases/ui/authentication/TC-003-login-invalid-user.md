# TC-003 - Login User with Invalid Credentials

## Test Information

| Field | Value |
|---|---|
| Test Case ID | TC-003 |
| Feature | Authentication |
| Scenario | Login with invalid credentials |
| Priority | High |
| Test Type | Functional / Negative |
| Automation Status | Automated |

## Preconditions

- The user is on the Automation Exercise website.

## Test Data

| Field | Value |
|---|---|
| Email | Unregistered email address |
| Password | Invalid password |

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Navigate to the Signup / Login page | The login page is displayed |
| 2 | Verify the "Login to your account" section | The login form is visible |
| 3 | Enter an unregistered email address | The email is entered |
| 4 | Enter an invalid password | The password is entered |
| 5 | Click "Login" | Authentication is rejected |
| 6 | Verify the error message | "Your email or password is incorrect!" is displayed |

## Expected Result

The user remains logged out and sees the invalid-credentials error message.

## Automation

Automated in `tests/e2e/authentication/login.spec.ts`.
