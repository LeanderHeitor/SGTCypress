import LoginActions from '../../support/pages/login/loginActions';
import NavigationActions from '../../support/pages/navegação/navegacaoActions';
describe('Brasil Mais Mentoria Lean', () => {
    const loginActions = LoginActions;
    const navigationActions = NavigationActions;
    beforeEach(() => {
        loginActions.visit();
        loginActions.loginAsAdmin();
    });
    it('deve acessar o módulo de Brasil Mais Mentoria como Admin', () => {
        navigationActions.goToBrasilMaisMentoriaLean();
    });
});
