import { faker } from '@faker-js/faker';
import Papa from 'papaparse';

import config from '@common/config';

import { ensureFileExists, pathJoin } from '@utils/fileUtils';

/**
 * Generates a realistic fake user profile.
 *
 * @returns {Object} User credentials object
 */
export const generateCredentials = () => {
  const allowedCountries = ['India', 'United States', 'Canada', 'Australia', 'Israel', 'New Zealand', 'Singapore'];
  const country = faker.helpers.arrayElement(allowedCountries);
  const gender = faker.person.sexType(); // 'male' or 'female'
  const title = gender === 'male' ? 'Mr' : 'Mrs';
  const firstName = faker.person.firstName(gender);
  const lastName = faker.person.lastName(gender);
  const birthDate = faker.date.birthdate({ min: 18, max: 65, mode: 'age' });

  return {
    username: faker.internet.username({ firstName, lastName }).toLowerCase(),
    password: faker.internet.password(15),
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
    title,
    dob: birthDate.toISOString().split('T')[0],
    dobYear: birthDate.getFullYear().toString(),
    dobMonth: (birthDate.getMonth() + 1).toString(),
    dobDay: birthDate.getDate().toString(),
    firstName,
    lastName,
    company: faker.company.name(),
    country,
    address1: faker.location.streetAddress({ useFullAddress: false }),
    address2: faker.location.secondaryAddress(),
    state: faker.location.state({ country }),
    city: faker.location.city(),
    zipcode: faker.location.zipCode(),
    mobile: faker.phone.number('+1-###-###-####'),
  };
};

/**
 * Appends the given credentials to the CSV file with proper headers if needed.
 *
 * @param {Object} credentials
 * @returns {Cypress.Chainable<void>}
 */
export const appendCredentialsToFile = (credentials) => {
  return pathJoin(config.fixturesFolder, 'credentials.csv').then((filePath) => {
    return ensureFileExists(filePath).then((exists) => {
      const row = Papa.unparse([credentials], { header: false });
      const header = Papa.unparse([credentials], { header: true }).split('\n')[0];

      if (exists) {
        return cy.readFile(filePath, { timeout: 1000, log: false }).then((content) => {
          const isEmpty = !content || content.trim().length === 0;
          const dataToWrite = (isEmpty ? header + '\n' : '') + row + '\n';

          return cy.writeFile(filePath, dataToWrite, { flag: isEmpty ? 'w' : 'a' }).then(() => {
            cy.log(`📥 Appended credentials for user: ${credentials.username}`);
          });
        });
      } else {
        const dataToWrite = header + '\n' + row + '\n';
        return cy.writeFile(filePath, dataToWrite).then(() => {
          cy.log(`📥 Created credentials file and added user: ${credentials.username}`);
        });
      }
    });
  });
};

/**
 * Generates and stores a new user into the CSV file.
 *
 * @returns {Cypress.Chainable<Object>}
 */
export const createNewTestUser = () => {
  const credentials = generateCredentials();
  return appendCredentialsToFile(credentials).then(() => credentials);
};

/**
 * Reads the most recently added credentials from the CSV file.
 *
 * @returns {Cypress.Chainable<Object>}
 */
export const getLatestCredentialsFromFile = () => {
  return pathJoin(config.fixturesFolder, 'credentials.csv').then((filePath) => {
    return cy.readFile(filePath).then((content) => {
      const parsed = Papa.parse(content.trim(), {
        header: true,
        skipEmptyLines: true,
      });

      const data = parsed.data;
      if (parsed.errors.length) throw new Error(`CSV parsing error: ${parsed.errors[0].message}`);
      if (data.length === 0) throw new Error('Credentials file is empty or missing data rows.');

      return data[data.length - 1];
    });
  });
};
