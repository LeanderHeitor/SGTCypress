import BrowseTheWeb from '../abilities/BrowseTheWeb.js';

/**
 * TheText - Question para verificar texto de elementos
 * 
 * Responsabilidades:
 * - Extrair texto de elementos
 * - Comparar textos
 * - Fornecer diferentes tipos de verificação de texto
 */
class TheText {
    constructor(selector) {
        this.selector = selector;
    }

    /**
     * Cria question para verificar texto
     * @param {string} selector - Seletor do elemento
     * @returns {TheText} - Instância da question
     */
    static of(selector) {
        return new TheText(selector);
    }

    /**
     * Responde a question extraindo o texto
     * @param {Actor} actor - Ator fazendo a pergunta
     * @returns {Promise<string>} - Texto do elemento
     */
    async answeredBy(actor) {
        const browser = actor.abilityTo(BrowseTheWeb);
        return new Promise((resolve) => {
            browser.locate(this.selector).invoke('text').then(resolve);
        });
    }

    /**
     * Verifica se o texto contém uma substring
     * @param {string} expectedText - Texto esperado
     * @returns {TextChecker} - Question que verifica se contém o texto
     */
    contains(expectedText) {
        return new TextChecker(this.selector, 'contains', expectedText);
    }

    /**
     * Verifica se o texto é exatamente igual
     * @param {string} expectedText - Texto esperado
     * @returns {TextChecker} - Question que verifica se texto é igual
     */
    equals(expectedText) {
        return new TextChecker(this.selector, 'equals', expectedText);
    }
}

/**
 * TextChecker - Question helper para verificar texto específico
 */
class TextChecker {
    constructor(selector, checkType, expectedText) {
        this.selector = selector;
        this.checkType = checkType;
        this.expectedText = expectedText;
    }

    async answeredBy(actor) {
        const textQuestion = new TheText(this.selector);
        const actualText = await textQuestion.answeredBy(actor);
        
        switch (this.checkType) {
            case 'contains':
                return actualText.includes(this.expectedText);
            case 'equals':
                return actualText.trim() === this.expectedText.trim();
            default:
                return false;
        }
    }
}

export default TheText;
