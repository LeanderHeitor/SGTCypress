import LoginActions from '../../support/pages/login/loginActions';
import NavigationActions from '../../support/pages/navegação/navegacaoActions'

describe('Gerenciamento de Clientes SGT', () => {
    const loginActions = LoginActions;
    const navigationActions = NavigationActions;
    beforeEach(() => {
        loginActions.visit();
        loginActions.loginAsAdmin();
    });
    it('deve acessar o módulo de clientes', () => {
        navigationActions.goToCliente();
        cy.log('log')
    });
});