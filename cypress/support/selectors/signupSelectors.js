// cypress/support/selectors/signupSelectors.js
const signupSelectors = {
  titleRadio: (title) => `[data-qa=title] input[value="${title}"]`,
  createAccountButton: '[data-qa=create-account]',
  username: '[data-qa=name]',
  email: '[data-qa=email]',
  password: '[data-qa=password]',
  dobDay: '[data-qa=days]',
  dobMonth: '[data-qa=months]',
  dobYear: '[data-qa=years]',
  firstName: '[data-qa=first_name]',
  lastName: '[data-qa=last_name]',
  company: '[data-qa=company]',
  address1: '[data-qa=address]',
  address2: '[data-qa=address2]',
  country: '[data-qa=country]',
  state: '[data-qa=state]',
  city: '[data-qa=city]',
  zipcode: '[data-qa=zipcode]',
  mobile: '[data-qa=mobile_number]',
};

export default signupSelectors;
