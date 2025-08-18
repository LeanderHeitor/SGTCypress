/**
 * Actor - Representa um usuário do sistema no padrão Screenplay
 * 
 * Responsabilidades:
 * - Gerenciar habilidades (abilities) do ator
 * - Executar tarefas (tasks) e interações (interactions)
 * - Fazer perguntas (questions) sobre o estado do sistema
 * - Manter contexto do ator durante os testes
 */
class Actor {
    constructor(name) {
        this.name = name;
        this.abilities = new Map();
        this.context = new Map();
    }

    /**
     * Concede uma habilidade ao ator
     * @param {Object} ability - Habilidade a ser concedida
     * @returns {Actor} - Retorna o próprio ator para method chaining
     */
    whoCan(ability) {
        this.abilities.set(ability.constructor.name, ability);
        return this;
    }

    /**
     * Verifica se o ator possui uma habilidade específica
     * @param {Function} abilityClass - Classe da habilidade
     * @returns {Object} - A instância da habilidade
     */
    abilityTo(abilityClass) {
        const abilityName = abilityClass.name;
        if (!this.abilities.has(abilityName)) {
            throw new Error(`${this.name} does not have the ability to ${abilityName}`);
        }
        return this.abilities.get(abilityName);
    }

    /**
     * Executa uma tarefa
     * @param {Object} task - Tarefa a ser executada
     * @returns {Actor} - Retorna o próprio ator para method chaining
     */
    attemptsTo(...tasks) {
        for (const task of tasks) {
            task.performAs(this);
        }
        return this;
    }

    /**
     * Faz uma pergunta sobre o estado do sistema
     * @param {Object} question - Pergunta a ser feita
     * @returns {Promise} - Promise com a resposta
     */
    async asks(question) {
        return await question.answeredBy(this);
    }

    /**
     * Verifica uma condição
     * @param {Object} question - Pergunta/condição a ser verificada
     * @returns {Promise} - Promise com o resultado da verificação
     */
    async should(question) {
        const result = await this.asks(question);
        return result;
    }

    /**
     * Armazena informação no contexto do ator
     * @param {string} key - Chave
     * @param {*} value - Valor
     */
    remember(key, value) {
        this.context.set(key, value);
    }

    /**
     * Recupera informação do contexto do ator
     * @param {string} key - Chave
     * @returns {*} - Valor armazenado
     */
    recall(key) {
        return this.context.get(key);
    }

    /**
     * Limpa o contexto do ator
     */
    forgetAll() {
        this.context.clear();
    }
}

export default Actor;
