class navegacaoPage{

    getStandardSideBarLink(a){
        return cy.get(`.FirstSidebar a[href="${a}"]`);
    }
    getPageTitle(pageTitle) {
        return cy.contains('h1', pageTitle);
    }
    getPageSubTitle(pageSubTitle) {
        return cy.contains('h2', pageSubTitle);
    }

    getSpanTitle(spanTitle) {
        return cy.contains('span', spanTitle);
    }
    getDashboardBrasilSubModule() {
        return cy.contains('div', "Dashboard Brasil Mais");
    }
    getDashboardAtendimentosSubModule() {
        return cy.contains('div', "Dashboard Atendimentos");
    }
    getDashboardDivergenciasSubModule() {
        return cy.contains('div', "Dashboard Divergências");
    }
    getProducaoGrupoSubModule(){
        return cy.contains('div', "Produção em Grupo");
    }

    getProducaoGrupoSubModule(){
        return cy.contains('div', "Produção em Grupo");
    }
    getProducaoIndividualSubModule(){
        return cy.contains('div', "Produção Individual");
    }
    getConfiguracaoParametrosSubModule(){
        return cy.contains('div', "Parâmetros");
    }
    getConfiguracaoUnidadesSubModule(){
        return cy.contains('div', "Unidade");
    }
    getConfiguracaoPerfisSubModule(){
        return cy.contains('div', "Perfis de Usuário");
    }
    getConfiguracaoUsuariosSubModule(){
        return cy.contains('div', "Usuários");
    }
    getIndicadoresSucessoSubModule(){
        return cy.contains('div', "Sucesso do Negócio");
    }
    getIndicadoresValorParaClienteSubModule(){
        return cy.contains('div', "Valor para o cliente");
    }
    getIndicadoresRecursosSubModule(){
        return cy.contains('div', "Recursos / CI");
    }
    getIndicadoresProcessosDeNegocioSubModule(){
        return cy.contains('div', "Processos de negócio");
    }
    getMentoriaLeanSubModule(){
        return cy.contains('div', "Mentoria Lean");
    }
    getMentoriaDigitalSubModule(){
        return cy.contains('div', "Mentoria Digital");
    }
    getPortifolioRegionalSubModule(){
        return cy.contains('div', "Portfólio Regional");
    }
    getPortifolioNacionalSubModule(){
        return cy.contains('div', "Portfólio Nacional");
    }
}
export default  navegacaoPage;
