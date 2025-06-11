import { clickConfirmButton, enterInfo } from '@utils/formUtils';

import signupSelectors from '@selectors/signupSelectors';

/**
 * Represents the Signup Page, encapsulating methods to interact with the signup form.
 */
class SignupPage {
  /**
   * Fills the complete signup form (typically step 2).
   *
   * @param {Object} credentials - The user credentials object containing all necessary signup data.
   * @param {string} credentials.title - The user's title (e.g., 'Mr.', 'Mrs.').
   * @param {string} credentials.password - The user's password.
   * @param {string} credentials.dobDay - The day of the user's birth (e.g., '15').
   * @param {string} credentials.dobMonth - The month of the user's birth (e.g., 'March', '03').
   * @param {string} credentials.dobYear - The year of the user's birth (e.g., '1990').
   * @param {string} credentials.firstName - The user's first name.
   * @param {string} credentials.lastName - The user's last name.
   * @param {string} credentials.company - The user's company name.
   * @param {string} credentials.address1 - The first line of the user's address.
   * @param {string} credentials.address2 - The second line of the user's address.
   * @param {string} credentials.country - The user's country (e.g., 'United States').
   * @param {string} credentials.state - The user's state/province.
   * @param {string} credentials.city - The user's city.
   * @param {string} credentials.zipcode - The user's postal code.
   * @param {string} credentials.mobile - The user's mobile number.
   * @param {Object} [options={}] - Optional flags to skip specific fields during form filling.
   * @param {boolean} [options.title=true] - Set to `false` to skip filling the title.
   * @param {boolean} [options.password=true] - Set to `false` to skip filling the password.
   * @param {boolean} [options.dobDay=true] - Set to `false` to skip filling the day of birth.
   * @param {boolean} [options.dobMonth=true] - Set to `false` to skip filling the month of birth.
   * @param {boolean} [options.dobYear=true] - Set to `false` to skip filling the year of birth.
   * @param {boolean} [options.firstName=true] - Set to `false` to skip filling the first name.
   * @param {boolean} [options.lastName=true] - Set to `false` to skip filling the last name.
   * @param {boolean} [options.company=true] - Set to `false` to skip filling the company.
   * @param {boolean} [options.address1=true] - Set to `false` to skip filling address line 1.
   * @param {boolean} [options.address2=true] - Set to `false` to skip filling address line 2.
   * @param {boolean} [options.country=true] - Set to `false` to skip filling the country.
   * @param {boolean} [options.state=true] - Set to `false` to skip filling the state.
   * @param {boolean} [options.city=true] - Set to `false` to skip filling the city.
   * @param {boolean} [options.zipcode=true] - Set to `false` to skip filling the zipcode.
   * @param {boolean} [options.mobile=true] - Set to `false` to skip filling the mobile number.
   * @example
   * const userCredentials = {
   * title: 'Mr.',
   * password: 'SecurePassword123!',
   * dobDay: '15',
   * dobMonth: 'March',
   * dobYear: '1990',
   * firstName: 'John',
   * lastName: 'Doe',
   * company: 'Acme Corp',
   * address1: '123 Main St',
   * address2: 'Apt 4B',
   * country: 'United States',
   * state: 'New York',
   * city: 'New York',
   * zipcode: '10001',
   * mobile: '1234567890',
   * };
   *
   * // Fill the entire form
   * SignupPage.fillSignupForm(userCredentials);
   *
   * // Fill the form, skipping the company and address2 fields
   * SignupPage.fillSignupForm(userCredentials, { company: false, address2: false });
   */
  fillSignupForm(credentials, options = {}) {
    this.enterUserInfo(credentials, options);
    this.enterUserAddress(credentials, options);
    clickConfirmButton(signupSelectors.createAccountButton);
  }

  /**
   * Fills the personal information section of the signup form.
   *
   * @param {Object} credentials - The user credentials object.
   * @param {string} credentials.title - The user's title (e.g., 'Mr.', 'Mrs.').
   * @param {string} credentials.password - The user's password.
   * @param {string} credentials.dobDay - The day of the user's birth (e.g., '15').
   * @param {string} credentials.dobMonth - The month of the user's birth (e.g., 'March', '03').
   * @param {string} credentials.dobYear - The year of the user's birth (e.g., '1990').
   * @param {string} credentials.firstName - The user's first name.
   * @param {string} credentials.lastName - The user's last name.
   * @param {string} credentials.company - The user's company name.
   * @param {Object} [options={}] - Optional flags to skip specific fields.
   * @param {boolean} [options.title=true] - Set to `false` to skip filling the title.
   * @param {boolean} [options.password=true] - Set to `false` to skip filling the password.
   * @param {boolean} [options.dobDay=true] - Set to `false` to skip filling the day of birth.
   * @param {boolean} [options.dobMonth=true] - Set to `false` to skip filling the month of birth.
   * @param {boolean} [options.dobYear=true] - Set to `false` to skip filling the year of birth.
   * @param {boolean} [options.firstName=true] - Set to `false` to skip filling the first name.
   * @param {boolean} [options.lastName=true] - Set to `false` to skip filling the last name.
   * @param {boolean} [options.company=true] - Set to `false` to skip filling the company.
   * @example
   * const userCredentials = {
   * title: 'Mrs.',
   * password: 'AnotherSecurePassword!',
   * dobDay: '01',
   * dobMonth: 'January',
   * dobYear: '1985',
   * firstName: 'Jane',
   * lastName: 'Smith',
   * company: 'Global Innovations',
   * };
   *
   * // Fill all personal information fields
   * SignupPage.enterUserInfo(userCredentials);
   *
   * // Fill personal information but skip title and company
   * SignupPage.enterUserInfo(userCredentials, { title: false, company: false });
   */
  enterUserInfo(credentials, options = {}) {
    if (options.title !== false) enterInfo(signupSelectors.titleRadio(credentials.title), { isOption: true });
    if (options.password !== false)
      enterInfo(signupSelectors.password, { value: credentials.password, sensitive: true });
    if (options.dobDay !== false) enterInfo(signupSelectors.dobDay, { value: credentials.dobDay, isSelect: true });
    if (options.dobMonth !== false)
      enterInfo(signupSelectors.dobMonth, { value: credentials.dobMonth, isSelect: true });
    if (options.dobYear !== false) enterInfo(signupSelectors.dobYear, { value: credentials.dobYear, isSelect: true });
    if (options.firstName !== false) enterInfo(signupSelectors.firstName, { value: credentials.firstName });
    if (options.lastName !== false) enterInfo(signupSelectors.lastName, { value: credentials.lastName });
    if (options.company !== false) enterInfo(signupSelectors.company, { value: credentials.company });
  }

  /**
   * Fills the address section of the signup form.
   *
   * @param {Object} credentials - The user credentials object.
   * @param {string} credentials.address1 - The first line of the user's address.
   * @param {string} credentials.address2 - The second line of the user's address.
   * @param {string} credentials.country - The user's country (e.g., 'United States').
   * @param {string} credentials.state - The user's state/province.
   * @param {string} credentials.city - The user's city.
   * @param {string} credentials.zipcode - The user's postal code.
   * @param {string} credentials.mobile - The user's mobile number.
   * @param {Object} [options={}] - Optional flags to skip specific fields.
   * @param {boolean} [options.address1=true] - Set to `false` to skip filling address line 1.
   * @param {boolean} [options.address2=true] - Set to `false` to skip filling address line 2.
   * @param {boolean} [options.country=true] - Set to `false` to skip filling the country.
   * @param {boolean} [options.state=true] - Set to `false` to skip filling the state.
   * @param {boolean} [options.city=true] - Set to `false` to skip filling the city.
   * @param {boolean} [options.zipcode=true] - Set to `false` to skip filling the zipcode.
   * @param {boolean} [options.mobile=true] - Set to `false` to skip filling the mobile number.
   * @example
   * const userCredentials = {
   * address1: '456 Oak Ave',
   * address2: 'Unit 10',
   * country: 'Canada',
   * state: 'Ontario',
   * city: 'Toronto',
   * zipcode: 'M5V 2H1',
   * mobile: '9876543210',
   * };
   *
   * // Fill all address fields
   * SignupPage.enterUserAddress(userCredentials);
   *
   * // Fill address but skip address2 and mobile
   * SignupPage.enterUserAddress(userCredentials, { address2: false, mobile: false });
   */
  enterUserAddress(credentials, options = {}) {
    if (options.address1 !== false) enterInfo(signupSelectors.address1, { value: credentials.address1 });
    if (options.address2 !== false) enterInfo(signupSelectors.address2, { value: credentials.address2 });
    if (options.country !== false) enterInfo(signupSelectors.country, { value: credentials.country, isSelect: true });
    if (options.state !== false) enterInfo(signupSelectors.state, { value: credentials.state });
    if (options.city !== false) enterInfo(signupSelectors.city, { value: credentials.city });
    if (options.zipcode !== false) enterInfo(signupSelectors.zipcode, { value: credentials.zipcode });
    if (options.mobile !== false) enterInfo(signupSelectors.mobile, { value: credentials.mobile });
  }
}

export default new SignupPage();