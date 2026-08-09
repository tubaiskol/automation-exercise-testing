export interface Credentials {
  email: string;
  password: string;
}

export interface User extends Credentials {
  name: string;
}

export interface Address {
  firstName: string;
  lastName: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  mobileNumber: string;
}

export interface RegistrationData extends User {
  address: Address;
}

export interface PaymentDetails {
  nameOnCard: string;
  cardNumber: string;
  cvc: string;
  expiryMonth: string;
  expiryYear: string;
}
