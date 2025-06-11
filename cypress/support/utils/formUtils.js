/**
 * Flexible form input helper.
 *
 * @param {string} selector - Selector for the element.
 * @param {Object} options
 * @param {string} options.value - Value to enter/select.
 * @param {boolean} [options.sensitive=false] - If true, hides input value in Cypress logs.
 * @param {boolean} [options.isSelect=false] - If true, treats field as a dropdown and selects value.
 * @param {boolean} [options.isOption=false] - If true, treats field as option/radio/checkbox and clicks.
 */
export function enterInfo(selector, { value, sensitive = false, isSelect = false, isOption = false }) {
  const element = cy.get(selector);

  if (isOption) {
    element.click();
  } else if (isSelect) {
    if (value) element.select(value).should('have.value', value);
  } else {
    if (value)
      element
        .clear()
        .type(value, sensitive ? { sensitive: true } : {})
        .blur();
    else element.clear().blur(); // clear if empty
  }
}

/**
 * Clicks a confirm button ensuring it exists and is enabled.
 *
 * @param {string} selector - Selector for the confirm button
 */
export function clickConfirmButton(selector) {
  cy.get(selector).should('exist').and('not.be.disabled').click();
}
