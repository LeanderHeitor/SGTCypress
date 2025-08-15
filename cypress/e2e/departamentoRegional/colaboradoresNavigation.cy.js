import LoginActions from '../../support/pages/login/loginActions';
import NavigationActions from '../../support/pages/navegação/navegacaoActions';
describe('Gerenciamento de Colaboradores SGT', () => {
    const loginActions = LoginActions;
    const navigationActions = NavigationActions;
    beforeEach(() => {
        loginActions.visit();
        loginActions.loginAsDepartamentoRegional();
    });
    it('deve acessar o módulo de colaboradores', () => {
        navigationActions.goToColaborador();
        cy.log('log')
    });
});