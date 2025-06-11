const config = {
  // Base URL (Application base URL from Cypress config)
  baseUrl: Cypress.config().baseUrl, // Base URL of the app (from Cypress configuration)

  // Root of the Cypress project
  projectRoot: Cypress.config('projectRoot'),

  // Where fixture files are stored (e.g., JSON data)
  fixturesFolder: Cypress.config('fixturesFolder'),

  // Where screenshots taken by Cypress are saved
  screenshotsFolder: Cypress.config('screenshotsFolder'),

  // Where videos of test runs are saved
  videosFolder: Cypress.config('videosFolder'),

  // Where downloaded files are stored (if configured)
  downloadsFolder: Cypress.config('downloadsFolder'),

  // The default support file path (if using one)
  supportFile: Cypress.config('supportFile'),

  // The folder where Cypress test files live
  integrationFolder: Cypress.config('integrationFolder'),

  // The folder used for plugins (if applicable)
  pluginsFile: Cypress.config('pluginsFile'),

  // Path to your config file (cypress.config.js or .ts)
  configFile: Cypress.config('configFile'),
};

export default config;