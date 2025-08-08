import LoginActions from '../../../support/pages/login/loginActions';
import NavigationActions from '../../../support/pages/navegação/navegacaoActions';
describe('Produção SGT', () => {
    const loginActions = LoginActions;
    const navigationActions = NavigationActions;
    beforeEach(() => {
        loginActions.visit();
    });
    it('deve acessar o módulo de produção grupo como departamento regional', () => {
        // Clica no link
        loginActions.loginAsDepartamentoRegional();
        navigationActions.goToProducaoGrupo();
        cy.log('Módulo de produção grupo carregado');
    });

    it('deve acessar o módulo de produção individual', () => {
        loginActions.loginAsDepartamentoRegional();
        navigationActions.goToProducaoIndividual();
        cy.log('Módulo de produção individual carregado');
    });
});