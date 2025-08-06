import LoginActions from '../support/pages/login/loginActions';
import NavigationActions from '../support/pages/navegação/navegacaoActions';
describe('Indicadores SGT', () => {
    beforeEach(() => {
        const loginActions = LoginActions;
        const navigationActions = NavigationActions;
        loginActions.visit();
        loginActions.loginWithValidCredentials();
        navigationActions.goToIndicadores();
    });
    it('deve acessar o módulo de indicadores', () => {
        cy.log('log')
    });
});