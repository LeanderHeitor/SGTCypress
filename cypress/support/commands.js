// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//entra na pagina inicial do sistema
Cypress.Commands.add('start', () => {
  cy.visit('/');
});
//Vai para um modulo específico do sistema
Cypress.Commands.add('goTo', (a, pageName, pageTitle) => {
    cy.get('a[href="' + a + '"]')
        .contains(pageName)
        .should('be.visible')
        .click()
    cy.contains('h1', pageTitle)
        .should('be.visible')
})