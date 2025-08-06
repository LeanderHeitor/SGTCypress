import NavegacaoPage from './navegacaoPage';

class navegacaoActions{
constructor (){
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
        .click();
    this.navegacaoPage.getPageTitle(pageTitle)
        .should('be.visible');
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
goToProducao() {
    const url = Cypress.env('producao_url');
    const pageTitle = Cypress.env('producao_title');
    this.navegacaoPage.getStandardSideBarLink(url)
        .realHover()
        .wait(2000)
        .click();
    this.navegacaoPage.getPageTitle(pageTitle)
        .should('be.visible');
    return this;
}
goToProdutos() {
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
    
}
export default new navegacaoActions();
