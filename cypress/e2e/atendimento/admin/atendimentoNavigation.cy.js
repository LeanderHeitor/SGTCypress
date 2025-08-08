import LoginActions from '../../../support/pages/login/loginActions';
import NavegacaoActions from '../../../support/pages/navegação/navegacaoActions';
describe('Atendimento', () => {
    const loginActions = LoginActions
    const navegacaoActions = NavegacaoActions;
    beforeEach(() => {
        
        loginActions.visit();
        loginActions.loginAsAdmin();
        
    });
    it('deve acessar o módulo de atendimento', () => {
        navegacaoActions.goToAtendimento(); 
    });
});