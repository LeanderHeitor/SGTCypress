import BrowseTheWeb from '../abilities/BrowseTheWeb.js';

/**
 * TheVisibility - Question para verificar visibilidade de elementos
 * 
 * Responsabilidades:
 * - Verificar se elementos estão visíveis
 * - Verificar existência de elementos
 * - Fornecer diferentes tipos de verificação de estado
 */
class TheVisibility {
    constructor(selector) {
        this.selector = selector;
    }

    /**
     * Cria question para verificar visibilidade
     * @param {string} selector - Seletor do elemento
     * @returns {TheVisibility} - Instância da question
     */
    static of(selector) {
        return new TheVisibility(selector);
    }

    /**
     * Responde se o elemento está visível
     * @param {Actor} actor - Ator fazendo a pergunta
     * @returns {Promise<boolean>} - True se visível
     */
    async answeredBy(actor) {
        const browser = actor.abilityTo(BrowseTheWeb);
        return new Promise((resolve) => {
            browser.locate(this.selector)
                .then($el => {
                    if ($el.is(':visible')) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                })
                .catch(() => resolve(false));
        });
    }
}

/**
 * TheExistence - Question para verificar existência de elementos
 */
class TheExistence {
    constructor(selector) {
        this.selector = selector;
    }

    static of(selector) {
        return new TheExistence(selector);
    }

    async answeredBy(actor) {
        const browser = actor.abilityTo(BrowseTheWeb);
        return new Promise((resolve) => {
            browser.locate(this.selector)
                .then(() => resolve(true))
                .catch(() => resolve(false));
        });
    }
}

/**
 * ThePageTitle - Question para verificar título da página
 */
class ThePageTitle {
    static displayed() {
        return new ThePageTitle();
    }

    async answeredBy(actor) {
        const browser = actor.abilityTo(BrowseTheWeb);
        return new Promise((resolve) => {
            browser.getTitle().then(resolve);
        });
    }

    contains(expectedTitle) {
        return new PageTitleChecker(expectedTitle);
    }
}

/**
 * TheCurrentUrl - Question para verificar URL atual
 */
class TheCurrentUrl {
    static displayed() {
        return new TheCurrentUrl();
    }

    async answeredBy(actor) {
        const browser = actor.abilityTo(BrowseTheWeb);
        return new Promise((resolve) => {
            browser.getCurrentUrl().then(resolve);
        });
    }

    includes(expectedPath) {
        return new CurrentUrlChecker(expectedPath);
    }
}

/**
 * PageTitleChecker - Question helper para verificar título específico
 */
class PageTitleChecker {
    constructor(expectedTitle) {
        this.expectedTitle = expectedTitle;
    }

    async answeredBy(actor) {
        const pageTitleQuestion = new ThePageTitle();
        const actualTitle = await pageTitleQuestion.answeredBy(actor);
        return actualTitle.includes(this.expectedTitle);
    }
}

/**
 * CurrentUrlChecker - Question helper para verificar URL específica
 */
class CurrentUrlChecker {
    constructor(expectedPath) {
        this.expectedPath = expectedPath;
    }

    async answeredBy(actor) {
        const currentUrlQuestion = new TheCurrentUrl();
        const actualUrl = await currentUrlQuestion.answeredBy(actor);
        return actualUrl.includes(this.expectedPath);
    }
}

export { TheVisibility, TheExistence, ThePageTitle, TheCurrentUrl };
