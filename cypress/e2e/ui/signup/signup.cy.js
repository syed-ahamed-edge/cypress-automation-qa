import { createNewTestUser, getLatestCredentialsFromFile } from '@utils/credentialsUtils';
import { waitForStableDOM } from '@utils/functionUtils';

import loginPage from '@pages/login/loginPage';
import signupPage from '@pages/signup/signupPage';

describe('User Registration Flow', () => {
  before('Generate and store a new test user', () => {
    createNewTestUser();
  });

  beforeEach('Go to signup page', () => {
    cy.visit('/login');
  });

  context('Happy Path', () => {
    it('Registers a valid new user successfully', () => {
      const successMessage = 'Congratulations! Your new account has been successfully created!';

      getLatestCredentialsFromFile().then((credentials) => {
        cy.log(`Registering user: ${credentials.username}`);
        loginPage.fillSignupFormInitial(credentials);
        signupPage.fillSignupForm(credentials);

        // Wait for confirmation or redirect
        waitForStableDOM();

        // Post-signup assertion
        cy.url().should('include', '/account_created');
        cy.contains(successMessage).should('exist');
      });
    });
  });

  context('Negative Path - Missing Required Fields', () => {
    const requiredFields = ['password', 'firstName', 'lastName', 'country', 'state', 'city', 'zipcode', 'mobile'];

    const omitField = (credentials, key) => {
      const modified = { ...credentials };
      delete modified[key];
      return modified;
    };

    requiredFields.forEach((field) => {
      it(`Should NOT allow user creation when '${field}' is missing`, () => {
        getLatestCredentialsFromFile().then((credentials) => {
          const modifiedCredentials = omitField(credentials, field);

          cy.log(`Testing missing field: ${field}`);
          loginPage.fillSignupFormInitial(modifiedCredentials);
          signupPage.fillSignupForm(modifiedCredentials);

          waitForStableDOM();

          // Assert we're still on the signup page
          cy.url().should('include', '/signup');

          // Optional: ensure no success toast/snackbar
          cy.contains('Account created').should('not.exist');
        });
      });
    });
  });
});
