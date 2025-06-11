/**
 * Wait for the DOM to stabilize before interaction.
 * This is useful for scenarios where the DOM is dynamically updated and you need to wait for the page to stabilize before interacting with elements.
 *
 * @param {object} [options] - Options for waiting the DOM to stabilize
 * @param {number} [options.pollInterval=1000] - Interval to check for DOM stability
 * @param {number} [options.timeout=10000] - Timeout before failing the check
 *
 * @example
 * // Wait for the DOM to stabilize with default options
 * waitForStableDOM();
 *
 * // Wait for the DOM to stabilize with a custom poll interval of 500ms and timeout of 8000ms
 * waitForStableDOM({ pollInterval: 500, timeout: 8000 });
 */
export function waitForStableDOM({ pollInterval = 1000, timeout = 10000 } = {}) {
   cy.waitForStableDOM({ pollInterval, timeout });
};