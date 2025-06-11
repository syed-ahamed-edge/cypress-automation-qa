/**
 * Checks if a file exists at the given absolute path.
 * Create one if it doesn't exists.
 *
 * @example
 *   ensureFileExists('/path/to/file.csv').then(console.log);
 *
 * @param {string} filePath - The full file path to check
 * @returns {Cypress.Chainable<boolean>}
 */
export function ensureFileExists(filePath) {
  return cy.task('ensureFileExists', filePath);
}

/**
 * Joins multiple path segments into a single normalized path.
 *
 * @example
 *   pathJoin('cypress', 'fixtures', 'credentials.csv').then(console.log);
 *
 * @param {...string} segments - One or more path segments
 * @returns {Cypress.Chainable<string>}
 */
export function pathJoin(...segments) {
  return cy.task('joinPath', segments);
}
