describe('Login', () => {
  before(() => {
      cy.start();
    })
  it('deve fazer login com sucesso', () => {
    cy.get('[data-testid="email"]')
    .type('igor.conde@sistemafiepe.org.br')
    cy.get('[data-testid="password"]')
    .type('123456')
    cy.get('[data-testid="login-btn"]')
    .click()
    cy.wait(5000)
    cy.contains('h1', 'Dashboard')
    .should('be.visible')
    //cy.goTo('/cad/atendimento/atendimento', "Atendimentos", 'Atendimentos')
    
  })
  it('login com email não cadastrado', () => {
    cy.get('[data-testid="email"]')
    .type('esseemailnaoexiste@sistemafiepe.org.br')
    cy.get('[data-testid="password"]')
    .type('123456')
    cy.get('[data-testid="login-btn"]')
    .click()
    cy.contains('Email ou Senha incorretos.')
    .should('be.visible')
    cy.contains('Erro no login. Entre em contato com o suporte.')
    .should('be.visible')
    //cy.goTo('/cad/atendimento/atendimento', "Atendimentos", 'Atendimentos')
    
  })
  it.only('login como senha inválida', () => {
    //senha errada da f5 na pagina
    cy.get('[data-testid="email"]')
    .type('igor.conde@sistemafiepe.org.br')
    cy.get('[data-testid="password"]')
    .type('senhaerrada')
    cy.get('[data-testid="login-btn"]')
    .click()
    cy.wait(5000)
    cy.contains('h1', 'Dashboard')
    .should('be.visible')
    //cy.goTo('/cad/atendimento/atendimento', "Atendimentos", 'Atendimentos')
    
  })
  it('Deve testar campos obrigatórios', () => {
    cy.get('[data-testid="login-btn"]')
    .click()
    cy.contains('Login é obrigatório. fasfasfasfa')
    .should('be.visible')
    .and ('have.class', 'text-red-500')
    cy.contains('Senha é obrigatória.')
    .should('be.visible')
    .and ('have.class', 'text-red-500')
    
    //cy.goTo('/cad/atendimento/atendimento', "Atendimentos", 'Atendimentos')
    
  })

})