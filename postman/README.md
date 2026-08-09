# Postman API Tests

## Contents

- `collections/AutomationExercise.postman_collection.json`: all 14 official API scenarios.
- `environments/AutomationExercise.example.postman_environment.json`: safe example environment without real credentials.

## Postman Usage

1. Import the collection and example environment into Postman.
2. Duplicate the example environment for local use.
3. Add a dedicated test account to `testUserEmail` and `testUserPassword` if you want to run API-007.
4. Run an individual request, a feature folder, or the complete collection.

The Accounts folder deliberately runs create, update, get, and delete in lifecycle
order. The account email is generated before API-011 and API-012 performs cleanup.

## Postman CLI Usage

```bash
npm run test:postman
```

Install the official Postman CLI separately before using this optional command.
The CLI is not bundled in `package.json`; CI regression coverage is handled by
Playwright to keep the Node.js dependency tree small and auditable.

Generated reports and local Postman environment files are ignored by Git.
