import LoginActions from '../../../support/pages/login/loginActions';
import NavigationActions from '../../../support/pages/navegação/navegacaoActions';
describe('Dashboard SGT', () => {
  const loginActions = LoginActions;
  const navigationActions = NavigationActions;

  beforeEach(() => {
    loginActions.visit();
    loginActions.loginAsDepartamentoRegional();
  });

  it('deve acessar o módulo de dashboard como Departamento Regional', () => {
    navigationActions.goToDashboard();
    cy.log('Módulo de dashboard carregado');
  });
});