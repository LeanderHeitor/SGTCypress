import LoginActions from '../../support/pages/login/loginActions';
import NavigationActions from '../../support/pages/navegação/navegacaoActions';
describe('Receita SGT', () => {
    const loginActions = LoginActions;
    const navigationActions = NavigationActions;
    beforeEach(() => {
        loginActions.visit();
        loginActions.loginAsDepartamentoRegional();
    });
    it('deve acessar o módulo de receita como Departamento Regional', () => {
        navigationActions.goToReceitas();
        cy.log('log')
    });
});