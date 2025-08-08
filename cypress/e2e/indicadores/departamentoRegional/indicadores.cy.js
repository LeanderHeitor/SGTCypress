import LoginActions from '../../../support/pages/login/loginActions';
import NavigationActions from '../../../support/pages/navegação/navegacaoActions';
describe('Indicadores SGT', () => {
    const loginActions = LoginActions;
    const navigationActions = NavigationActions;
    beforeEach(() => {

        loginActions.visit();
        loginActions.loginAsDepartamentoRegional();
    });
    it('deve acessar o módulo de indicadores Sucesso do Negócio Departamento Regional', () => {
        navigationActions.goToIndicadoresSucesso();
        cy.log('log')
    });
    it('deve acessar o módulo de indicadores Valor para o Cliente Departamento Regional', () => {
        navigationActions.goToIndicadoresValorCliente();
        cy.log('log')
    });
    it('deve acessar o módulo de indicadores Recursos / CI Departamento Regional', () => {
        navigationActions.goToIndicadoresRecursosCI();
        cy.log('log')
    });
    it.only('deve acessar o módulo de indicadores Processos de Negócio Departamento Regional', () => {
        navigationActions.goToIndicadoresProcessosNegocio();
        cy.log('log')
    });
});