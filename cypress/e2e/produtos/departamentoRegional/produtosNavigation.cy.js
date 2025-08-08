import LoginActions from '../../../support/pages/login/loginActions';
import NavigationActions from '../../../support/pages/navegação/navegacaoActions';
describe('Produtos Regionais SGT', () => {
    const loginActions = LoginActions;
    const navigationActions = NavigationActions;
    beforeEach(() => {
        loginActions.visit();
    });
    it('deve acessar o módulo de produtos regionais como departamento Regional', () => {
        loginActions.loginAsDepartamentoRegional();
        navigationActions.goToProdutosDepartamentoRegional();
        cy.log('log')
    });
});