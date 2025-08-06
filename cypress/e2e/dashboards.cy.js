import LoginActions from '../support/pages/login/loginActions';
import NavigationActions from '../support/pages/navegação/navegacaoActions';
describe('Dashboard SGT', () => {
    it('deve acessar o módulo de dashboard', () => {
      const loginActions = LoginActions;
      const navigationActions = NavigationActions;
        loginActions.visit();
        loginActions.loginWithValidCredentials();
        navigationActions.goToDashboard();
        cy.log('Módulo de dashboard carregado');
    });
});