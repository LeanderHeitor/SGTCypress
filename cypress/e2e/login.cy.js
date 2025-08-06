import LoginActions from '.././support/pages/login/loginActions';
describe('Login', () => {
  const loginActions = LoginActions;
  it('deve fazer login com sucesso', () => {
    loginActions.visit();
    loginActions.loginWithValidCredentials();
    loginActions.checkLoginCookies();
  })
  it('login com email não cadastrado', () => {
    loginActions.visit();
    loginActions.loginWithNonExistentEmail();
    //cy.goTo('/cad/atendimento/atendimento', "Atendimentos", 'Atendimentos')

  })
  it('login com senha inválida', () => {
    //senha errada da f5 na pagina
    loginActions.visit();
    loginActions.loginWithInvalidPassword();

  })
  it('Deve testar campos obrigatórios', () => {
    loginActions.visit(); 
    loginActions.verifyingRequiredFields();

    //cy.goTo('/cad/atendimento/atendimento', "Atendimentos", 'Atendimentos')

  })

})