import type { RegistrationData } from '../types/testData';

export function generateUniqueEmail(prefix = 'tuba.qa'): string {
  const uniquePart = `${Date.now()}.${Math.random().toString(36).slice(2, 8)}`;
  return `${prefix}.${uniquePart}@example.com`;
}

export function createRegistrationData(): RegistrationData {
  return {
    name: 'Tuba QA',
    email: generateUniqueEmail(),
    password: 'TestPassword123!',
    address: {
      firstName: 'Tuba',
      lastName: 'Tester',
      address: '123 Test Street',
      country: 'Canada',
      state: 'Ontario',
      city: 'Toronto',
      zipCode: 'M5V 2T6',
      mobileNumber: '5551234567',
    },
  };
}
