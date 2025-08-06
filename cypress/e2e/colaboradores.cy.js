import LoginActions from '../support/pages/login/loginActions';
import NavigationActions from '../support/pages/navegação/navegacaoActions';
describe('Gerenciamento de Colaboradores SGT', () => {
    beforeEach(() => {
        const loginActions = LoginActions;
        const navigationActions = NavigationActions;
        loginActions.visit();
        loginActions.loginWithValidCredentials();
        navigationActions.goToColaborador();
    });
    it('deve acessar o módulo de colaboradores', () => {
        cy.log('log')
    });
});