import type { Credentials } from '../types/testData';

export const invalidUser: Credentials = {
  email: 'qa-user@invalid.example',
  password: 'WrongPassword123!',
};

export function getTestUser(): Credentials | null {
  const email = process.env.TEST_USER_EMAIL;
  const password = process.env.TEST_USER_PASSWORD;

  return email && password ? { email, password } : null;
}
