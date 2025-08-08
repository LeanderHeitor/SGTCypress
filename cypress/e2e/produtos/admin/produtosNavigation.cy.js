import LoginActions from '../../../support/pages/login/loginActions';
import NavigationActions from '../../../support/pages/navegação/navegacaoActions';
describe('Produtos Regionais SGT', () => {
    const loginActions = LoginActions;
    const navigationActions = NavigationActions;
    beforeEach(() => {
        loginActions.visit();
    });
    it('deve acessar o módulo de produtos regionais como Admin', () => {
        loginActions.loginAsAdmin();
        navigationActions.goToProdutosDepartamentoRegional();
        cy.log('log')
    });
    it.only('deve acessar o módulo de produtos nacionais como Admin', () => {
        loginActions.loginAsAdmin();
        navigationActions.goToProdutoNacionalAdmin();
        cy.log('log')
    });
});