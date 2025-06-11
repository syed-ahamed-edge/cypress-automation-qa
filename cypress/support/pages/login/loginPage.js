import { clickConfirmButton, enterInfo } from '@utils/formUtils';

import loginSelectors from '@selectors/loginSelectors';

class LoginPage {
  /**
   * Fill the initial signup form (username and email), then proceed to next page.
   *
   * @param {Object} credentials
   */
  fillSignupFormInitial(credentials) {
    enterInfo(loginSelectors.signupName, { value: credentials.username });
    enterInfo(loginSelectors.signupEmail, { value: credentials.email });
    clickConfirmButton(loginSelectors.signupButton);
  }
}

export default new LoginPage();
