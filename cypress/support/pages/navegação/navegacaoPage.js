class navegacaoPage{

    getStandardSideBarLink(a){
        return cy.get(`.FirstSidebar a[href="${a}"]`);
    }
    getPageTitle(pageTitle) {
        return cy.contains('h1', pageTitle);
    }
}
export default  navegacaoPage;
