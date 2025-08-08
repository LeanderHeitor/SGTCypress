import LoginActions from '../../../support/pages/login/loginActions';
import NavigationActions from '../../../support/pages/navegação/navegacaoActions';
describe('Laboratórios SGT', () => {
    const loginActions = LoginActions;
    const navigationActions = NavigationActions;
    beforeEach(() => {
        loginActions.visit();
    });
    it('deve acessar o módulo de laboratórios como Admin', () => {
        loginActions.loginAsAdmin();
        navigationActions.goToLaboratorios();
        cy.log('Módulo de laboratórios carregado');
    });
});