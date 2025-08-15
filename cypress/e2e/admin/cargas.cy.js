import LoginActions from '../../support/pages/login/loginActions';
import NavigationActions from '../../support/pages/navegação/navegacaoActions';
describe('Cargas', () => {
    const loginActions = LoginActions;
    const navigationActions = NavigationActions;
    beforeEach(() => {
        loginActions.visit();
        loginActions.loginAsAdmin();
    });
    it('deve acessar o módulo de cargas como Admin', () => {
        navigationActions.goToCargas();
    });
})