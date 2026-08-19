export interface Credentials {
  email: string;
  password: string;
}

export interface User extends Credentials {
  name: string;
}

/** The only values the signup form's title radio group accepts. */
export type Title = 'Mr' | 'Mrs';

/** The seven options the signup form's country dropdown offers. */
export type Country =
  | 'India'
  | 'United States'
  | 'Canada'
  | 'Australia'
  | 'Israel'
  | 'New Zealand'
  | 'Singapore';

/**
 * The date-of-birth dropdowns are selected by option *value*, not by label.
 * Day and year values match what is displayed, but month values are numbers
 * ('1' = January), so keep these as the value strings the form expects.
 */
export interface DateOfBirth {
  day: string;
  month: string;
  year: string;
}

/** The "Enter Account Information" block of the signup form. */
export interface AccountInformation {
  title: Title;
  password: string;
  dateOfBirth: DateOfBirth;
  subscribeToNewsletter: boolean;
  receiveSpecialOffers: boolean;
}

/** The "Address Information" block of the signup form. */
export interface AddressInformation {
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  address2: string;
  country: Country;
  state: string;
  city: string;
  zipCode: string;
  mobileNumber: string;
}

/** Everything needed to drive the full UI registration journey end to end. */
export interface SignupUser extends User {
  account: AccountInformation;
  address: AddressInformation;
}

export interface PaymentDetails {
  nameOnCard: string;
  cardNumber: string;
  cvc: string;
  expiryMonth: string;
  expiryYear: string;
}
