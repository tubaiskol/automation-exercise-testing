import type { AccountPayload } from '../types/api';
import type { SignupUser } from '../types/testData';

export function generateUniqueEmail(prefix = 'tuba.qa'): string {
  const uniquePart = `${Date.now()}.${Math.random().toString(36).slice(2, 8)}`;
  return `${prefix}.${uniquePart}@example.com`;
}

/**
 * Builds a complete identity for the UI registration journey. Every call gets a
 * fresh email so parallel workers never collide, and `overrides` lets a test
 * pin any field it needs to assert on.
 */
export function createSignupUser(
  overrides: Partial<SignupUser> = {},
): SignupUser {
  return {
    name: 'Tuba QA',
    email: generateUniqueEmail(),
    password: 'TestPassword123!',
    account: {
      title: 'Mrs',
      password: 'TestPassword123!',
      dateOfBirth: { day: '1', month: '1', year: '1995' },
      subscribeToNewsletter: true,
      receiveSpecialOffers: true,
    },
    address: {
      firstName: 'Tuba',
      lastName: 'Tester',
      company: 'QA Practice',
      address: '123 Test Street',
      address2: 'Suite 1',
      country: 'Canada',
      state: 'Ontario',
      city: 'Toronto',
      zipCode: 'M5V2T6',
      mobileNumber: '5551234567',
    },
    ...overrides,
  };
}

/**
 * Builds the form payload the account endpoints expect. Every call gets a fresh
 * email so account tests never collide, and `overrides` lets the update
 * scenario reuse the same identity with different profile values.
 */
export function createAccountPayload(
  overrides: Partial<AccountPayload> = {},
): AccountPayload {
  return {
    name: 'Tuba QA',
    email: generateUniqueEmail(),
    password: 'TestPassword123!',
    title: 'Mrs',
    birth_date: '1',
    birth_month: '1',
    birth_year: '1995',
    firstname: 'Tuba',
    lastname: 'Tester',
    company: 'QA Practice',
    address1: '123 Test Street',
    address2: 'Suite 1',
    country: 'Canada',
    zipcode: 'M5V2T6',
    state: 'Ontario',
    city: 'Toronto',
    mobile_number: '5551234567',
    ...overrides,
  };
}
