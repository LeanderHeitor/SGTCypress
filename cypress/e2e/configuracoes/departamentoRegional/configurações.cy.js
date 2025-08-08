import LoginActions from '../../../support/pages/login/loginActions';
import NavigationActions from '../../../support/pages/navegação/navegacaoActions';
describe('Configurações SGT', () => {
    const loginActions = LoginActions;
    const navigationActions = NavigationActions;
    beforeEach(() => {

        loginActions.visit();
        loginActions.loginAsDepartamentoRegional();

    });
    //usuario sem acesso
    it('deve acessar o módulo de configurações parametros como Igor', () => {
        navigationActions.goToConfiguracaoParametrosDepartamentoRegional();
        cy.log('log');
    });
    it('deve acessar o módulo de configurações unidades como Igor', () => {
        navigationActions.goToConfiguracaoUnidadesDepartamentoRegional();
        cy.log('log');
    });
    it('deve acessar o módulo de configurações perfis de usuário como Igor', () => {
        navigationActions.goToConfiguracaoPerfisDeUsuariosDepartamentoRegional();
        cy.log('log');
    });
    it('deve acessar o módulo de configurações usuários como Igor', () => {
        navigationActions.goToConfiguracaoUsuariosDepartamentoRegional();
        cy.log('log');
    });

});