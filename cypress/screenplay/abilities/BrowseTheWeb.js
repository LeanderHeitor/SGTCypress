/**
 * BrowseTheWeb - Habilidade fundamental para interagir com navegador
 * 
 * Responsabilidades:
 * - Fornecer acesso aos comandos Cypress de forma encapsulada
 * - Abstrair a complexidade dos comandos do navegador
 * - Servir como ponte entre Screenplay e Cypress
 */
class BrowseTheWeb {
    /**
     * Método estático para criar a habilidade
     * @returns {BrowseTheWeb} - Nova instância da habilidade
     */
    static using() {
        return new BrowseTheWeb();
    }

    /**
     * Navega para uma URL
     * @param {string} url - URL de destino
     */
    visit(url) {
        return cy.visit(url);
    }

    /**
     * Localiza elemento na página
     * @param {string} selector - Seletor do elemento
     * @returns {Cypress.Chainable} - Elemento encontrado
     */
    locate(selector) {
        return cy.get(selector);
    }

    /**
     * Localiza elemento por texto
     * @param {string} text - Texto a ser localizado
     * @returns {Cypress.Chainable} - Elemento encontrado
     */
    locateByText(text) {
        return cy.contains(text);
    }

    /**
     * Espera por elemento
     * @param {string} selector - Seletor do elemento
     * @param {number} timeout - Timeout em ms
     */
    waitFor(selector, timeout = 10000) {
        return cy.get(selector, { timeout });
    }

    /**
     * Clica em elemento com verificação robusta
     * @param {string} selector - Seletor do elemento
     * @param {Object} options - Opções do clique
     */
    clickElement(selector, options = {}) {
        return cy.get(selector)
            .should('exist')
            .should('be.visible')
            .then($el => {
                // Verificar se elemento tem getBoundingClientRect antes de usar realClick
                if (options.realClick && typeof $el[0].getBoundingClientRect === 'function') {
                    return cy.wrap($el).realClick(options);
                } else {
                    return cy.wrap($el).click(options);
                }
            });
    }

    /**
     * Digita texto com verificação robusta
     * @param {string} selector - Seletor do elemento
     * @param {string} text - Texto a ser digitado
     * @param {Object} options - Opções da digitação
     */
    typeInElement(selector, text, options = {}) {
        return cy.get(selector)
            .should('exist')
            .should('be.visible')
            .then($el => {
                if (options.clear) {
                    cy.wrap($el).clear();
                }
                return cy.wrap($el).type(text, options);
            });
    }

    /**
     * Executa JavaScript no navegador
     * @param {string} script - Script a ser executado
     */
    executeScript(script) {
        return cy.window().then((win) => win.eval(script));
    }

    /**
     * Captura screenshot
     * @param {string} name - Nome do screenshot
     */
    takeScreenshot(name) {
        return cy.screenshot(name);
    }

    /**
     * Obtém URL atual
     * @returns {Cypress.Chainable} - URL atual
     */
    getCurrentUrl() {
        return cy.url();
    }

    /**
     * Obtém título da página
     * @returns {Cypress.Chainable} - Título da página
     */
    getTitle() {
        return cy.title();
    }

    /**
     * Recarrega a página
     */
    reload() {
        return cy.reload();
    }

    /**
     * Volta uma página no histórico
     */
    goBack() {
        return cy.go('back');
    }

    /**
     * Avança uma página no histórico
     */
    goForward() {
        return cy.go('forward');
    }
}

export default BrowseTheWeb;
