import BrowseTheWeb from '../abilities/BrowseTheWeb.js';

/**
 * Type - Interação para digitar texto em campos
 * 
 * Responsabilidades:
 * - Encapsular a ação de digitação
 * - Limpar campos antes de digitar (opcional)
 * - Lidar com diferentes tipos de input
 */
class Type {
    constructor(text, target) {
        this.text = text;
        this.target = target;
        this.options = {};
    }

    /**
     * Cria uma interação de digitação
     * @param {string} text - Texto a ser digitado
     * @returns {Object} - Objeto com método into()
     */
    static theText(text) {
        return {
            into: (target) => new Type(text, target)
        };
    }

    /**
     * Define opções para a digitação
     * @param {Object} options - Opções da digitação
     * @returns {Type} - Instância da interação
     */
    withOptions(options) {
        this.options = { ...this.options, ...options };
        return this;
    }

    /**
     * Limpa o campo antes de digitar
     * @returns {Type} - Instância da interação
     */
    clearFirst() {
        return this.withOptions({ clear: true });
    }

    /**
     * Digita lentamente (útil para campos com validação em tempo real)
     * @param {number} delay - Delay entre caracteres em ms
     * @returns {Type} - Instância da interação
     */
    slowly(delay = 100) {
        return this.withOptions({ delay });
    }

    /**
     * Executa a interação
     * @param {Actor} actor - Ator executando a interação
     */
    performAs(actor) {
        const browser = actor.abilityTo(BrowseTheWeb);
        
        // Usar método robusto que verifica DOM antes de digitar
        return browser.typeInElement(this.target, this.text, this.options);
    }
}

export default Type;
