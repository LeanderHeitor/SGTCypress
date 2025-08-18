import BrowseTheWeb from '../abilities/BrowseTheWeb.js';

/**
 * Navigate - Interação para navegação entre páginas
 * 
 * Responsabilidades:
 * - Encapsular navegação web
 * - Validar carregamento de páginas
 * - Gerenciar estados de carregamento
 */
class Navigate {
    constructor(url) {
        this.url = url;
        this.validationSelector = null;
        this.validationText = null;
    }

    /**
     * Cria uma interação de navegação
     * @param {string} url - URL de destino
     * @returns {Navigate} - Instância da interação
     */
    static to(url) {
        return new Navigate(url);
    }

    /**
     * Define validação por seletor
     * @param {string} selector - Seletor para validar carregamento
     * @returns {Navigate} - Instância da interação
     */
    andWaitFor(selector) {
        this.validationSelector = selector;
        return this;
    }

    /**
     * Define validação por texto
     * @param {string} text - Texto para validar carregamento
     * @returns {Navigate} - Instância da interação
     */
    andWaitForText(text) {
        this.validationText = text;
        return this;
    }

    /**
     * Executa a interação
     * @param {Actor} actor - Ator executando a interação
     */
    performAs(actor) {
        const browser = actor.abilityTo(BrowseTheWeb);
        
        browser.visit(this.url);

        // Validação opcional de carregamento
        if (this.validationSelector) {
            browser.waitFor(this.validationSelector).should('be.visible');
        }

        if (this.validationText) {
            browser.locateByText(this.validationText).should('be.visible');
        }

        return this;
    }
}

/**
 * Reload - Interação para recarregar página
 */
class Reload {
    static thePage() {
        return new Reload();
    }

    performAs(actor) {
        const browser = actor.abilityTo(BrowseTheWeb);
        return browser.reload();
    }
}

export { Navigate, Reload };
