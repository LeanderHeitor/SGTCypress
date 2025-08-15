import LoginActions from '../../support/pages/login/loginActions';
import NavigationActions from '../../support/pages/navegação/navegacaoActions';
describe('Produtos Regionais SGT', () => {
    const loginActions = LoginActions;
    const navigationActions = NavigationActions;
    beforeEach(() => {
        loginActions.visit();
        loginActions.loginAsDepartamentoRegional();
    });
    it('deve acessar o módulo de produtos regionais como departamento Regional', () => {
        navigationActions.goToProdutosDepartamentoRegional();
        cy.log('log')
    });
});