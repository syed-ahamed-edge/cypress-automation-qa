const { defineConfig } = require('cypress');

const path = require('path');
const webpackPreprocessor = require('@cypress/webpack-preprocessor');
const webpackConfig = require('./webpack.config.js');
const fs = require('fs');

module.exports = defineConfig({
    e2e: {
        testIsolation: false,
        baseUrl: 'https://www.automationexercise.com/',
        setupNodeEvents(on, config) {
            on(
                'file:preprocessor',
                webpackPreprocessor({
                    webpackOptions: webpackConfig,
                })
            );

            on('task', {
                joinPath(segments) {
                    if (Array.isArray(segments)) return path.join(...segments);
                    throw new Error('Expected array of path segments.');
                },
                ensureFileExists(filePath) {
                    if (!fs.existsSync(filePath)) {
                        fs.writeFileSync(filePath, '', { flag: 'w' }); // Create empty file
                    }
                    return true; // File now exists, so always return true
                },
            });
            return config;
        },
        specPattern: '**.cy.js',
        excludeSpecPattern: '**.sk.cy.js',
    },
    chromeWebSecurity: false,
    experimentalMemoryManagement: true,
    viewportWidth: 1366,
    viewportHeight: 768,
    defaultCommandTimeout: 30000,
    requestTimeout: 30000,
    responseTimeout: 30000,
    numTestsKeptInMemory: 5,
    watchForFileChanges: false,
    scrollBehavior: 'center',
});
