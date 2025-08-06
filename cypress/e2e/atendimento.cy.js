import LoginActions from '../support/pages/login/loginActions';
import NavegacaoActions from '../support/pages/navegação/navegacaoActions';
describe('Atendimento', () => {
    const loginActions = LoginActions
    const navegacaoActions = NavegacaoActions;
    beforeEach(() => {
        
        loginActions.visit();
        loginActions.loginWithValidCredentials();
        navegacaoActions.goToAtendimento();
    });
    it('deve acessar o módulo de atendimento', () => {
        cy.log('log')
    });
});