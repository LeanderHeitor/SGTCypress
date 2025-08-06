import LoginActions from '../support/pages/login/loginActions';
import NavigationActions from '../support/pages/navegação/navegacaoActions';
describe('Home SGT', () => {
    beforeEach(() => {
        const loginActions = LoginActions;
        const navigationActions = NavigationActions;
        loginActions.visit();
        loginActions.loginWithValidCredentials();
        navigationActions.goToHome();
    });
    it('deve acessar o módulo de home', () => {
        cy.log('log')
    });
});