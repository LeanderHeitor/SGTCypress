describe('Login', () => {
  it('deve fazer login com sucesso', () => {
    cy.start();
    cy.get('[data-testid="email"]')
      .type('igor.conde@sistemafiepe.org.br')
    cy.get('[data-testid="password"]')
      .type('123456')
    cy.get('[data-testid="login-btn"]')
      .click()
    cy.wait(5000)



    cy.getAllCookies().then((cookies) => {
      //só executa depois que os cookies são recuperados
      // Verificações básicas de existência
      expect(cookies[0]).to.have.property('name');
      expect(cookies[0]).to.have.property('value');
      expect(cookies[0].value).to.not.be.empty;

      if (cookies[1]) {
        expect(cookies[1]).to.have.property('name');
        expect(cookies[1]).to.have.property('value');
        expect(cookies[1].value).to.not.be.empty;
      }

      // Verifica se os cookies específicos existem no array
      const sgtCookie = cookies.find(cookie => cookie.name === 'sgt.sid');
      const jsessionCookie = cookies.find(cookie => cookie.name === 'JSESSIONID');

      if (sgtCookie) {
        cy.log('Cookie sgt.sid encontrado no array:', JSON.stringify(sgtCookie, null, 2));
        expect(sgtCookie).to.have.property('value');
        expect(sgtCookie.value).to.not.be.empty;
      } else {
        cy.log('Cookie sgt.sid NÃO encontrado no array');
      }

      if (jsessionCookie) {
        cy.log('Cookie JSESSIONID encontrado no array:', JSON.stringify(jsessionCookie, null, 2));
        expect(jsessionCookie).to.have.property('value');
        expect(jsessionCookie.value).to.not.be.empty;
      } else {
        cy.log('Cookie JSESSIONID NÃO encontrado no array');
      }

    })

    cy.contains('h1', 'Dashboard')
      .should('be.visible')
  })
  it('login com email não cadastrado', () => {
    cy.start();
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
  it('login com senha inválida', () => {
    //senha errada da f5 na pagina
    cy.start();
    cy.get('[data-testid="email"]')
      .type('igor.conde@sistemafiepe.org.br')
    cy.get('[data-testid="password"]')
      .type('senhaerrada')
    cy.get('[data-testid="login-btn"]')
      .click()
    //cy.goTo('/cad/atendimento/atendimento', "Atendimentos", 'Atendimentos')
    cy.contains('Email ou Senha incorretos.')
      .should('be.visible')

  })
  it('Deve testar campos obrigatórios', () => {
    cy.start();
    cy.get('[data-testid="login-btn"]')
      .click()
    cy.contains('Login é obrigatório. fasfasfasfa')
      .should('be.visible')
      .and('have.class', 'text-red-500')

    cy.contains('Senha é obrigatória.')
      .should('be.visible')
      .and('have.class', 'text-red-500')

    //cy.goTo('/cad/atendimento/atendimento', "Atendimentos", 'Atendimentos')

  })

})