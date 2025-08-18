import Click from '../interactions/Click.js';
import BrowseTheWeb from '../abilities/BrowseTheWeb.js';

/**
 * NavigateToSection - Task para navegação no menu/sidebar
 * 
 * Responsabilidades:
 * - Navegar entre seções do sistema
 * - Validar carregamento da seção de destino
 * - Lidar com menus dinâmicos/sidebar
 * - Reutilizar lógica do POM quando apropriado
 */
class NavigateToSection {
    constructor(sectionPath, expectedTitle) {
        this.sectionPath = sectionPath;
        this.expectedTitle = expectedTitle;
        this.useRealHover = false;
    }

    /**
     * Cria task de navegação
     * @param {string} sectionPath - Caminho da seção (ex: '/cad/atendimento/atendimento')
     * @param {string} expectedTitle - Título esperado da página
     * @returns {NavigateToSection} - Instância da task
     */
    static to(sectionPath, expectedTitle) {
        return new NavigateToSection(sectionPath, expectedTitle);
    }

    /**
     * Usa hover real para elementos que precisam
     * @returns {NavigateToSection} - Instância da task
     */
    withRealHover() {
        this.useRealHover = true;
        return this;
    }

    /**
     * Executa a task
     * @param {Actor} actor - Ator executando a task
     */
    performAs(actor) {
        const browser = actor.abilityTo(BrowseTheWeb);

        // seletor da sidebar baseado no POM existente
        const sidebarSelector = `.FirstSidebar a[href="${this.sectionPath}"]`;

        if (this.useRealHover) {
            // Usar realHover para elementos que precisam (compatibilidade com código existente)
            browser.locate(sidebarSelector).realHover().click();
        } else {
            actor.attemptsTo(
                Click.on(sidebarSelector)
            );
        }

        // Validar carregamento da seção
        if (this.expectedTitle) {
            browser.locateByText(this.expectedTitle).should('be.visible');
        }

        // Armazenar informação da navegação no contexto
        actor.remember('currentSection', {
            path: this.sectionPath,
            title: this.expectedTitle
        });

        return this;
    }
}

/**
 * NavigateToAtendimento - Task específica para navegação de Atendimento
 */
class NavigateToAtendimento extends NavigateToSection {
    static page() {
        const sectionPath = Cypress.env('ATENDIMENTO_PATH') || '/cad/atendimento/atendimento';
        const expectedTitle = Cypress.env('ATENDIMENTO_TITLE') || 'Atendimentos';
        
        return new NavigateToAtendimento(sectionPath, expectedTitle)
            .withRealHover();
    }
}

/**
 * NavigateToClientes - Task específica para navegação de Clientes
 */
class NavigateToClientes extends NavigateToSection {
    static page() {
        const sectionPath = Cypress.env('CLIENTES_PATH') || '/cad/cliente/cliente';
        const expectedTitle = Cypress.env('CLIENTES_TITLE') || 'Clientes';
        
        return new NavigateToClientes(sectionPath, expectedTitle)
            .withRealHover();
    }
}

/**
 * NavigateToDashboard - Task específica para navegação do Dashboard
 */
class NavigateToDashboard extends NavigateToSection {
    static page() {
        const sectionPath = Cypress.env('DASHBOARD_PATH') || '/dashboard';
        const expectedTitle = Cypress.env('DASHBOARD_TITLE') || 'Dashboard';
        
        return new NavigateToDashboard(sectionPath, expectedTitle);
    }
}

export { 
    NavigateToSection, 
    NavigateToAtendimento, 
    NavigateToClientes, 
    NavigateToDashboard 
};
