import LoginActions from '../../support/pages/login/loginActions';
import NavigationActions from '../../support/pages/navegação/navegacaoActions';
describe('Dashboard SGT - Admin', () => {
    const loginActions = LoginActions;
    const navigationActions = NavigationActions;

    beforeEach(() => {
        loginActions.visit();
        loginActions.loginAsAdmin();
    });

    it('deve acessar o módulo de dashboard Brasil Mais como admin', () => {
        navigationActions.goToDashboardBrasilMais();
        cy.log('Módulo de dashboard Brasil Mais carregado');
    });
    it('deve acessar o módulo de dashboard Atendimentos como admin', () => {
        navigationActions.goToDashboardAtendimentos();
        cy.log('Módulo de dashboard Atendimentos carregado');
    });
    it('deve acessar o módulo de dashboard Divergências como admin', () => {
        navigationActions.goToDashboardDivergencias();
        cy.log('Módulo de dashboard Divergências carregado');
    });
});