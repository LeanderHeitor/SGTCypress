import NavegacaoPage from './navegacaoPage';

class navegacaoActions {
    constructor() {
        this.navegacaoPage = new NavegacaoPage();
    }

    goToAtendimento() {
        const url = Cypress.env('atendimento_url');
        const pageTitle = Cypress.env('atendimento_title');
        this.navegacaoPage.getStandardSideBarLink(url)
            .realHover()
            .wait(2000)
            .click();
        this.navegacaoPage.getPageTitle(pageTitle)
            .should('be.visible');
        return this;
    }
    goToCliente() {
        const url = Cypress.env('cliente_url');
        const pageTitle = Cypress.env('cliente_title');
        this.navegacaoPage.getStandardSideBarLink(url)
            .realHover()
            .wait(2000)
            .click();
        this.navegacaoPage.getPageTitle(pageTitle)
            .should('be.visible');
        return this;
    }
    goToColaborador() {
        const url = Cypress.env('colaboradores_url');
        const pageTitle = Cypress.env('colaboradores_title');
        this.navegacaoPage.getStandardSideBarLink(url)
            .realHover()
            .wait(2000)
            .click();
        this.navegacaoPage.getPageTitle(pageTitle)
            .should('be.visible');
        return this;
    }
    goToConfiguracoes() {
        const url = Cypress.env('configuracoes_url');
        const pageTitle = Cypress.env('configuracoes_title');
        this.navegacaoPage.getStandardSideBarLink(url)
            .realHover()
            .wait(2000)
            .click();
        this.navegacaoPage.getPageTitle(pageTitle)
            .should('be.visible');
        return this;
    }
    goToDashboard() {
        const url = Cypress.env('dashboard_url');
        const pageTitle = Cypress.env('dashboard_title');
        this.navegacaoPage.getStandardSideBarLink(url)
            .realHover()
            .wait(2000)
            .click()
            .wait(2000)
        this.navegacaoPage.getPageTitle(pageTitle)
            .should('be.visible');
        return this;
    }
    goToDashboardBrasilMais() {
        const url = Cypress.env('dashboard_brasil_url');
        const brasil_mais_title = Cypress.env('dashboard_brasil_title');
        this.navegacaoPage.getStandardSideBarLink(url)
            .realHover()
        this.navegacaoPage.getDashboardBrasilSubModule()
            .click()
            .wait(5000)
        this.navegacaoPage.getPageTitle(brasil_mais_title)
            .should('exist')
        return this;
    }
    goToDashboardAtendimentos() {
        const url = Cypress.env('dashboard_brasil_url');
        const atendimento_title = Cypress.env('dashboard_atendimentos_title');
        this.navegacaoPage.getStandardSideBarLink(url)
            .realHover()
        this.navegacaoPage.getDashboardAtendimentosSubModule()
            .click()
            .wait(5000)
        this.navegacaoPage.getPageTitle(atendimento_title)
            .should('exist')
        return this;
    }
    goToDashboardDivergencias() {
        const url = Cypress.env('dashboard_brasil_url');
        const divergencias_title = Cypress.env('dashboard_divergencias_title');
        this.navegacaoPage.getStandardSideBarLink(url)
            .realHover()
        this.navegacaoPage.getDashboardDivergenciasSubModule()
            .click()
            .wait(5000)
        this.navegacaoPage.getPageTitle(divergencias_title)
            .should('exist')
        return this;
    }
    goToHome() {
        const url = Cypress.env('home_url');
        const pageTitle = Cypress.env('home_title');
        this.navegacaoPage.getStandardSideBarLink(url)
            .realHover()
            .wait(2000)
            .click();
        this.navegacaoPage.getPageTitle(pageTitle)
            .should('be.visible');
        return this;
    }
    goToIndicadores() {
        const url = Cypress.env('indicadores_url');
        const pageTitle = Cypress.env('indicadores_title');
        this.navegacaoPage.getStandardSideBarLink(url)
            .realHover()
            .wait(2000)
            .click();
        this.navegacaoPage.getPageTitle(pageTitle)
            .should('be.visible');
        return this;
    }
    goToProducaoGrupo() {
        const url = Cypress.env('producao_url');
        const span_title = Cypress.env('span_title');
        this.navegacaoPage.getStandardSideBarLink(url)
            .realHover()
        this.navegacaoPage.getProducaoGrupoSubModule()
            .click()
            .wait(55000)
        this.navegacaoPage.getSpanTitle(span_title)
            .should('exist')
        return this;
    }
    goToProducaoIndividual() {
        const url = Cypress.env('producao_individual_url');
        const span_title = Cypress.env('span_individual_title');
        this.navegacaoPage.getStandardSideBarLink(url)
            .realHover()
        this.navegacaoPage.getProducaoIndividualSubModule()
            .click()
        this.navegacaoPage.getSpanTitle(span_title)
            .should('exist')
        return this;
    }
    goToConfiguracaoParametrosDepartamentoRegional() {
        const url = Cypress.env('configuracoes_url');
        const sem_acesso_title = Cypress.env('sem_acesso_title');
        this.navegacaoPage.getStandardSideBarLink(url)
            .realHover()
        this.navegacaoPage.getConfiguracaoParametrosSubModule()
            .click()
        this.navegacaoPage.getPageTitle(sem_acesso_title)
            .should('exist')
        return this;
    }
    goToConfiguracaoUnidadesDepartamentoRegional() {
        const url = Cypress.env('configuracoes_url');
        const unidades_title = Cypress.env('unidades_title');
        this.navegacaoPage.getStandardSideBarLink(url)
            .realHover()
        this.navegacaoPage.getConfiguracaoUnidadesSubModule()
            .click()
        this.navegacaoPage.getPageTitle(unidades_title)
            .should('exist')
        return this;
    }
    goToConfiguracaoPerfisDeUsuariosDepartamentoRegional() {
        const url = Cypress.env('configuracoes_url');
        const sem_acesso_title = Cypress.env('sem_acesso_title');
        this.navegacaoPage.getStandardSideBarLink(url)
            .realHover()
        this.navegacaoPage.getConfiguracaoPerfisSubModule()
            .click()
        this.navegacaoPage.getPageTitle(sem_acesso_title)
            .should('exist')
        return this;
    }
    goToConfiguracaoUsuariosDepartamentoRegional() {
        const url = Cypress.env('configuracoes_url');
        const usuario_title = Cypress.env('usuario_title');
        this.navegacaoPage.getStandardSideBarLink(url)
            .realHover()
        this.navegacaoPage.getConfiguracaoUsuariosSubModule()
            .click()
        this.navegacaoPage.getPageTitle(usuario_title)
            .should('exist')
        return this;
    }
    goToIndicadoresSucesso() {
        const url = Cypress.env('indicadores_url');
        const indicadores_sucesso = Cypress.env('indicadores_sucesso_title');
        this.navegacaoPage.getStandardSideBarLink(url)
            .realHover()
        this.navegacaoPage.getIndicadoresSucessoSubModule()
            .click()
            .wait(5000)
        this.navegacaoPage.getPageTitle(indicadores_sucesso)
            .should('exist')
        this.navegacaoPage.getPageSubTitle(Cypress.env('indicadores_sucesso_subtitle'))
            .should('exist')
        return this;
    }
    goToIndicadoresValorCliente() {
        const url = Cypress.env('indicadores_url');
        const indicadores_valor_cliente = Cypress.env('indicadores_valor_cliente_title');
        this.navegacaoPage.getStandardSideBarLink(url)
            .realHover()
        this.navegacaoPage.getIndicadoresValorParaClienteSubModule()
            .click()
            .wait(5000)
        this.navegacaoPage.getPageTitle(indicadores_valor_cliente)
            .should('exist')
        this.navegacaoPage.getPageSubTitle(Cypress.env('indicadores_valor_cliente_subtitle'))
            .should('exist')
        return this;
    }
    goToIndicadoresRecursosCI() {
        const url = Cypress.env('indicadores_url');
        const recursos_ci_title = Cypress.env('indicadores_recurso_ci_title');
        this.navegacaoPage.getStandardSideBarLink(url)
            .realHover()
        this.navegacaoPage.getIndicadoresRecursosSubModule()
            .click()
            .wait(5000)
        this.navegacaoPage.getPageTitle(recursos_ci_title)
            .should('exist')
        this.navegacaoPage.getPageSubTitle(Cypress.env('indicadores_recurso_ci_subtitle'))
            .should('exist')
        return this;
    }
    goToIndicadoresProcessosNegocio() {
        const url = Cypress.env('indicadores_url');
        const processos_negocio_title = Cypress.env('processos_negocio_title');
        this.navegacaoPage.getStandardSideBarLink(url)
            .realHover()
        this.navegacaoPage.getIndicadoresProcessosDeNegocioSubModule()
            .click()
            .wait(5000)
        this.navegacaoPage.getPageTitle(processos_negocio_title)
            .should('exist')
        this.navegacaoPage.getPageSubTitle(Cypress.env('processos_negocio_subtitle'))
            .should('exist')
        return this;
    }

    goToProdutosDepartamentoRegional() {
        const url = Cypress.env('produtos_url');
        const pageTitle = Cypress.env('produtos_title');
        this.navegacaoPage.getStandardSideBarLink(url)
            .realHover()
            .wait(2000)
            .click();
        this.navegacaoPage.getPageTitle(pageTitle)
            .should('be.visible');
        return this;
    }
    goToReceitas() {
        const url = Cypress.env('receitas_url');
        const pageTitle = Cypress.env('receitas_title');
        this.navegacaoPage.getStandardSideBarLink(url)
            .realHover()
            .wait(2000)
            .click();
        this.navegacaoPage.getPageTitle(pageTitle)
            .should('be.visible');
        return this;
    }
    goToReceitasAdmin(){
        const url = Cypress.env('receitas_url');
        const pageTitle = Cypress.env('sem_acesso_title');
        this.navegacaoPage.getStandardSideBarLink(url)
            .realHover()
            .wait(2000)
            .click();
        this.navegacaoPage.getPageTitle(pageTitle)
            .should('be.visible');
        return this;
    }

    goToMonitoramento() {
        const url = Cypress.env('monitoramento_url');
        const pageTitle = Cypress.env('monitoramento_title');
        this.navegacaoPage.getStandardSideBarLink(url)
            .realHover()
            .click()
            .wait(2000);
        this.navegacaoPage.getPageTitle(pageTitle)
            .should('be.visible');
        return this;
    }
    goToDocumentacao() {
        const url = Cypress.env('documentacao_url');
        const pageTitle = Cypress.env('documentacao_title');
        this.navegacaoPage.getStandardSideBarLink(url)
            .realHover()
            .click()
        /*this.navegacaoPage.getPageTitle(pageTitle)
            .should('be.visible');
        */
        return this;
    }
    goToCargas() {
        const url = Cypress.env('cargas_url');
        const pageTitle = Cypress.env('cargas_title');
        this.navegacaoPage.getStandardSideBarLink(url)
            .realHover()
            .click()
        /*this.navegacaoPage.getPageTitle(pageTitle)
            .should('be.visible');
        */
        return this;
    }
    goToBrasilMaisMentoriaLean() {
        const url = Cypress.env('brasil_mais_mentoria_lean_url');
        const pageTitle = Cypress.env('brasil_mais_mentoria_lean_title');
        this.navegacaoPage.getStandardSideBarLink(url)
            .realHover()
        this.navegacaoPage.getMentoriaLeanSubModule()
            .click()
            .wait(5000);
        this.navegacaoPage.getPageTitle(pageTitle)
            .should('be.visible');
        
        return this;
    }
    goToBrasilMaisMentoriaDigital() {
        const url = Cypress.env('brasil_mais_mentoria_lean_url');
        const pageTitle = Cypress.env('brasil_mais_mentoria_digital_title');
        this.navegacaoPage.getStandardSideBarLink(url)
            .realHover()
        this.navegacaoPage.getMentoriaDigitalSubModule()
            .click()
            .wait(5000);
        this.navegacaoPage.getPageTitle(pageTitle)
            .should('be.visible');
        
        return this;
    }
    goToLaboratorios(){
        const url = Cypress.env('laboratorios_url');
        const pageTitle = Cypress.env('laboratorios_title');
        this.navegacaoPage.getStandardSideBarLink(url)
            .realHover()
            .click();
        this.navegacaoPage.getPageTitle(pageTitle)
            .should('be.visible');
        return this;
    }
    goToProdutoRegionalAdmin() {
        const url = Cypress.env('produtos_url');
        const pageTitle = Cypress.env('produtos_title');
        this.navegacaoPage.getStandardSideBarLink(url)
            .realHover()
        this.navegacaoPage.getPortifolioRegionalSubModule()
            .click()
            .wait(5000);
        this.navegacaoPage.getPageTitle(pageTitle)
            .should('be.visible');
        return this;
    }
    goToProdutoNacionalAdmin() {
        const url = Cypress.env('produtos_url');
        const pageTitle = Cypress.env('produtos_nacional_title');
        this.navegacaoPage.getStandardSideBarLink(url)
            .realHover()
        this.navegacaoPage.getPortifolioNacionalSubModule()
            .click()
        this.navegacaoPage.getPageTitle(pageTitle)
            .should('be.visible');
        return this;
    }

}
export default new navegacaoActions();
