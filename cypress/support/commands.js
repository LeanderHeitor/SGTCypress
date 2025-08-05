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

import 'cypress-real-events';
Cypress.Commands.add('start', () => {
  cy.visit('/');
});
Cypress.Commands.add('submitLoginForm', (Email, Senha) => {
  cy.start();
  cy.get('[data-testid="email"]').type(Email);
  cy.get('[data-testid="password"]').type(Senha);
  cy.get('[data-testid="login-btn"]').click();
  cy.wait(5000)
});
Cypress.Commands.add('goTo', (a, pageTitle) => {
  cy.get('.FirstSidebar a[href="' + a + '"]')
  //pega a sidebar
    .realHover()
    .wait(5000)
    .click();
  
  cy.contains('h1', pageTitle)
    .should('be.visible');
});
