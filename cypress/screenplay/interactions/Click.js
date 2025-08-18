import BrowseTheWeb from '../abilities/BrowseTheWeb.js';

/**
 * Click - Interação para clicar em elementos
 * 
 * Responsabilidades:
 * - Encapsular a ação de clicar
 * - Fornecer diferentes tipos de clique
 * - Lidar com esperas e validações necessárias
 */
class Click {
    constructor(target) {
        this.target = target;
        this.options = {};
    }

    /**
     * Cria uma interação de clique
     * @param {string} target - Seletor do elemento
     * @returns {Click} - Instância da interação
     */
    static on(target) {
        return new Click(target);
    }

    /**
     * Define opções para o clique
     * @param {Object} options - Opções do clique
     * @returns {Click} - Instância da interação
     */
    withOptions(options) {
        this.options = { ...this.options, ...options };
        return this;
    }

    /**
     * Executa a interação
     * @param {Actor} actor - Ator executando a interação
     */
    performAs(actor) {
        const browser = actor.abilityTo(BrowseTheWeb);
        
        // Usar método robusto que verifica DOM antes de clicar
        return browser.clickElement(this.target, this.options);
    }

    /**
     * Clique com hover real (útil para elementos que precisam de hover)
     * @returns {Click} - Instância da interação
     */
    withRealHover() {
        return this.withOptions({ realClick: true });
    }

    /**
     * Força o clique mesmo se elemento estiver coberto
     * @returns {Click} - Instância da interação
     */
    force() {
        return this.withOptions({ force: true });
    }
}

export default Click;
