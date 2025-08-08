import LoginActions from '../../../support/pages/login/loginActions';
import NavigationActions from '../../../support/pages/navegação/navegacaoActions';
describe('Monitoramento SGT', () => {
    const loginActions = LoginActions;
    const navigationActions = NavigationActions;
    beforeEach(() => {
        loginActions.visit();
    });
    it('deve acessar o módulo de monitoramento como Admin', () => {
        loginActions.loginAsAdmin();
        navigationActions.goToMonitoramento();
        cy.log('Módulo de monitoramento carregado');
    });
});