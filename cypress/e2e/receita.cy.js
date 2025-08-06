import LoginActions from '../support/pages/login/loginActions';
import NavigationActions from '../support/pages/navegação/navegacaoActions';
describe('Receita SGT', () => {
    beforeEach(() => {
        const loginActions = LoginActions;
        const navigationActions = NavigationActions;
        loginActions.visit();
        loginActions.loginWithValidCredentials();
        navigationActions.goToReceitas();
    });
    it('deve acessar o módulo de receita', () => {
        cy.log('log')
    });
});