import LoginActions from '../support/pages/login/loginActions';
import NavigationActions from '../support/pages/navegação/navegacaoActions';
describe('Produtos Regionais SGT', () => {
    beforeEach(() => {
        const loginActions = LoginActions;
        const navigationActions = NavigationActions;
        loginActions.visit();
        loginActions.loginWithValidCredentials();
        navigationActions.goToProdutosRegionais();
    });
    it('deve acessar o módulo de produtos regionais', () => {
        cy.log('log')
    });
});