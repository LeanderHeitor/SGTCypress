import Actor from './Actor.js';

/**
 * Cast - Gerencia os atores do sistema
 * 
 * Responsabilidades:
 * - Criar e gerenciar instâncias de atores
 * - Fornecer atores pré-configurados para diferentes perfis
 * - Manter referências aos atores durante os testes
 * 
 * Padrão Singleton para garantir consistência entre testes
 */
class Cast {
    constructor() {
        this.actors = new Map();
    }

    /**
     * Cria ou recupera um ator pelo nome
     * @param {string} name - Nome do ator
     * @returns {Actor} - Instância do ator
     */
    actorNamed(name) {
        if (!this.actors.has(name)) {
            const actor = new Actor(name);
            // Adicionar método withCredentials ao ator
            actor.withCredentials = (credentialType) => {
                switch (credentialType) {
                    case 'admin':
                        actor.remember('userType', 'admin');
                        actor.remember('credentials', {
                            email: Cypress.env('admin_login_email'),
                            password: Cypress.env('admin_login_senha')
                        });
                        break;
                    case 'departamentoRegional':
                        actor.remember('userType', 'departamentoRegional');
                        actor.remember('credentials', {
                            email: Cypress.env('departamento_regional_login'),
                            password: Cypress.env('departamento_regional_password')
                        });
                        break;
                    case 'laboratorista':
                        actor.remember('userType', 'laboratorista');
                        break;
                    default:
                        // Para usuários inválidos ou genéricos
                        actor.remember('userType', 'invalid');
                        break;
                }
                return actor;
            };
            this.actors.set(name, actor);
        }
        return this.actors.get(name);
    }

    /**
     * Cria um ator admin pré-configurado
     * @param {string} name - Nome do ator (opcional)
     * @returns {Actor} - Ator admin
     */
    admin(name = 'Admin') {
        const actor = this.actorNamed(name);
        actor.remember('userType', 'admin');
        actor.remember('credentials', {
            email: Cypress.env('admin_login_email'),
            password: Cypress.env('admin_login_senha')
        });
        return actor;
    }

    /**
     * Cria um ator departamento regional pré-configurado
     * @param {string} name - Nome do ator (opcional)
     * @returns {Actor} - Ator departamento regional
     */
    departamentoRegional(name = 'DepartamentoRegional') {
        const actor = this.actorNamed(name);
        actor.remember('userType', 'departamentoRegional');
        actor.remember('credentials', {
            email: Cypress.env('departamento_regional_login'),
            password: Cypress.env('departamento_regional_password')
        });
        return actor;
    }

    /**
     * Cria um ator laboratorista pré-configurado
     * @param {string} name - Nome do ator (opcional)
     * @returns {Actor} - Ator laboratorista
     */
    laboratorista(name = 'Laboratorista') {
        const actor = this.actorNamed(name);
        actor.remember('userType', 'laboratorista');
        return actor;
    }

    /**
     * Remove todos os atores do cast
     */
    dismissAll() {
        this.actors.clear();
    }

    /**
     * Remove um ator específico
     * @param {string} name - Nome do ator a ser removido
     */
    dismiss(name) {
        this.actors.delete(name);
    }

    /**
     * Lista todos os atores ativos
     * @returns {Array} - Array com nomes dos atores
     */
    getActiveActors() {
        return Array.from(this.actors.keys());
    }
}

// Export singleton instance
export default new Cast();
