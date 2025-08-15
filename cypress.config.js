const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://qa.newsgt.isitics.com/',
    viewportWidth: 1440,
    viewportHeight: 900,
    // Configurações de timeout global
    defaultCommandTimeout: 10000,        // 10s para comandos (cy.get, cy.click, etc)
    requestTimeout: 15000,               // 15s para requisições HTTP
    responseTimeout: 15000,              // 15s para respostas de requisições
    pageLoadTimeout: 30000,              // 30s para carregamento de páginas
    execTimeout: 60000                   // 60s para tarefas (cy.exec, cy.task)
  },
});
