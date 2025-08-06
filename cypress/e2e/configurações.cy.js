import LoginActions from '../support/pages/login/loginActions';
import NavigationActions from '../support/pages/navegação/navegacaoActions';
describe('Configurações SGT', () => {
    beforeEach(() => {
        const loginActions = LoginActions;
        const navigationActions = NavigationActions;
        loginActions.visit();
        loginActions.loginWithValidCredentials();
        navigationActions.goToConfiguracoes();
    });
    //usuario sem acesso
    it('deve acessar o módulo de configurações usuario sem acesso', () => {
        cy.log('log');
    });

});