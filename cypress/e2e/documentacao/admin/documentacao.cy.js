import LoginActions from '../../../support/pages/login/loginActions';
import NavigationActions from '../../../support/pages/navegação/navegacaoActions';
describe('Documentação', () => {
    const loginActions = LoginActions;
    const navigationActions = NavigationActions;
    beforeEach(() => {
        loginActions.visit();
    });
    it('Deve acessar a página de Documentação como Admin', () => {


        loginActions.loginAsAdmin();
        navigationActions.goToDocumentacao();
    });
});