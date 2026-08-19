import { expect, type Locator, type Page } from '@playwright/test';

import type {
  AccountInformation,
  AddressInformation,
  SignupUser,
} from '../types/testData';
import { BasePage } from './BasePage';

/**
 * `/signup` — the "Enter Account Information" and "Address Information" form
 * reached after submitting the New User Signup block on {@link LoginPage}.
 *
 * The name field arrives pre-filled and the email field arrives pre-filled and
 * `disabled`, both carried over from the previous step.
 */
export class SignupPage extends BasePage {
  private readonly form: Locator;

  readonly accountInfoHeading: Locator;
  readonly addressInfoHeading: Locator;

  readonly titleMrRadio: Locator;
  readonly titleMrsRadio: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly daySelect: Locator;
  readonly monthSelect: Locator;
  readonly yearSelect: Locator;
  readonly newsletterCheckbox: Locator;
  readonly specialOffersCheckbox: Locator;

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly companyInput: Locator;
  readonly addressInput: Locator;
  readonly address2Input: Locator;
  readonly countrySelect: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipCodeInput: Locator;
  readonly mobileNumberInput: Locator;

  readonly createAccountButton: Locator;

  constructor(page: Page) {
    super(page, '/signup');

    this.form = page.locator('form[action="/signup"]');

    this.accountInfoHeading = page.getByRole('heading', {
      name: 'Enter Account Information',
    });
    this.addressInfoHeading = page.getByRole('heading', {
      name: 'Address Information',
    });

    // The radios share `name="title"` and are only distinguishable by id.
    this.titleMrRadio = this.form.locator('#id_gender1');
    this.titleMrsRadio = this.form.locator('#id_gender2');
    this.nameInput = this.form.locator('[data-qa="name"]');
    this.emailInput = this.form.locator('[data-qa="email"]');
    this.passwordInput = this.form.locator('[data-qa="password"]');
    this.daySelect = this.form.locator('[data-qa="days"]');
    this.monthSelect = this.form.locator('[data-qa="months"]');
    this.yearSelect = this.form.locator('[data-qa="years"]');
    this.newsletterCheckbox = this.form.locator('#newsletter');
    this.specialOffersCheckbox = this.form.locator('#optin');

    this.firstNameInput = this.form.locator('[data-qa="first_name"]');
    this.lastNameInput = this.form.locator('[data-qa="last_name"]');
    this.companyInput = this.form.locator('[data-qa="company"]');
    this.addressInput = this.form.locator('[data-qa="address"]');
    this.address2Input = this.form.locator('[data-qa="address2"]');
    this.countrySelect = this.form.locator('[data-qa="country"]');
    this.stateInput = this.form.locator('[data-qa="state"]');
    this.cityInput = this.form.locator('[data-qa="city"]');
    this.zipCodeInput = this.form.locator('[data-qa="zipcode"]');
    this.mobileNumberInput = this.form.locator('[data-qa="mobile_number"]');

    this.createAccountButton = this.form.locator('[data-qa="create-account"]');
  }

  // --- actions -------------------------------------------------------------

  async selectTitle(title: AccountInformation['title']): Promise<void> {
    const radio = title === 'Mr' ? this.titleMrRadio : this.titleMrsRadio;
    await radio.check();
  }

  /**
   * The dropdowns are keyed by option value. Day and year values equal their
   * labels, but month values are numeric ('1' renders as "January").
   */
  async selectDateOfBirth({
    day,
    month,
    year,
  }: AccountInformation['dateOfBirth']): Promise<void> {
    await this.daySelect.selectOption({ value: day });
    await this.monthSelect.selectOption({ value: month });
    await this.yearSelect.selectOption({ value: year });
  }

  async setNewsletter(subscribe: boolean): Promise<void> {
    await this.newsletterCheckbox.setChecked(subscribe);
  }

  async setSpecialOffers(receive: boolean): Promise<void> {
    await this.specialOffersCheckbox.setChecked(receive);
  }

  async fillAccountInformation(account: AccountInformation): Promise<void> {
    await this.selectTitle(account.title);
    await this.passwordInput.fill(account.password);
    await this.selectDateOfBirth(account.dateOfBirth);
    await this.setNewsletter(account.subscribeToNewsletter);
    await this.setSpecialOffers(account.receiveSpecialOffers);
  }

  async fillAddressInformation(address: AddressInformation): Promise<void> {
    await this.firstNameInput.fill(address.firstName);
    await this.lastNameInput.fill(address.lastName);
    await this.companyInput.fill(address.company);
    await this.addressInput.fill(address.address);
    await this.address2Input.fill(address.address2);
    await this.countrySelect.selectOption({ value: address.country });
    await this.stateInput.fill(address.state);
    await this.cityInput.fill(address.city);
    await this.zipCodeInput.fill(address.zipCode);
    await this.mobileNumberInput.fill(address.mobileNumber);
  }

  async submit(): Promise<void> {
    await this.createAccountButton.click();
  }

  /** Fills both blocks and submits, landing on the account-created screen. */
  async completeRegistration(user: SignupUser): Promise<void> {
    await this.fillAccountInformation(user.account);
    await this.fillAddressInformation(user.address);
    await this.submit();
  }

  // --- assertions ----------------------------------------------------------

  async expectLoaded(): Promise<void> {
    await expect(this.accountInfoHeading).toBeVisible();
    await expect(this.createAccountButton).toBeVisible();
  }

  async expectAccountInformationVisible(): Promise<void> {
    await expect(this.accountInfoHeading).toHaveText(
      'Enter Account Information',
    );
    await expect(this.titleMrRadio).toBeVisible();
    await expect(this.titleMrsRadio).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.daySelect).toBeVisible();
    await expect(this.monthSelect).toBeVisible();
    await expect(this.yearSelect).toBeVisible();
  }

  async expectAddressInformationVisible(): Promise<void> {
    await expect(this.addressInfoHeading).toHaveText('Address Information');
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.addressInput).toBeVisible();
    await expect(this.countrySelect).toBeVisible();
    await expect(this.mobileNumberInput).toBeVisible();
  }

  /** The name typed on the previous step is carried over. */
  async expectPrefilledName(name: string): Promise<void> {
    await expect(this.nameInput).toHaveValue(name);
  }

  /** The email is carried over and locked so it cannot be edited here. */
  async expectPrefilledEmailIsReadOnly(email: string): Promise<void> {
    await expect(this.emailInput).toHaveValue(email);
    await expect(this.emailInput).toBeDisabled();
  }

  async expectTitleSelected(title: AccountInformation['title']): Promise<void> {
    const radio = title === 'Mr' ? this.titleMrRadio : this.titleMrsRadio;
    await expect(radio).toBeChecked();
  }

  async expectCountryOptions(expected: string[]): Promise<void> {
    const values = await this.countrySelect
      .locator('option')
      .evaluateAll((options) =>
        options.map((option) => (option as HTMLOptionElement).value),
      );
    expect(values).toEqual(expected);
  }
}
