import { Cast, BrowseTheWeb, Login, NavigateToAtendimento, TheVisibility } from '../../screenplay';
import LoginActions from '../../support/pages/login/loginActions';

/**
 * Exemplo de Teste - Coexistência POM + Screenplay
 * 
 * Este teste demonstra como usar ambos os padrões lado a lado:
 * - Screenplay para fluxos principais e legibilidade
 * - POM para funcionalidades específicas já implementadas
 */
describe('Exemplo: Screenplay + POM Coexistindo', () => {
    let admin;
    let departamentoRegional;

    beforeEach(() => {
        // Configurar atores com habilidades
        admin = Cast.admin('João Admin')
            .whoCan(BrowseTheWeb.using());
            
        departamentoRegional = Cast.departamentoRegional('Maria Regional')
            .whoCan(BrowseTheWeb.using());
    });

    afterEach(() => {
        // Limpar cast após cada teste
        Cast.dismissAll();
    });

    describe('Usando Screenplay Pattern', () => {
        it('Admin deve fazer login e navegar para atendimentos (Screenplay)', () => {
            admin.attemptsTo(
                Login.asAdmin(),
                NavigateToAtendimento.page()
            );

            // Verificar se chegou na página correta
            // Usar cy.contains ao invés de seletor CSS
            cy.contains('h1', 'Atendimentos').should('be.visible');
        });

        it('Departamento Regional deve fazer login com credenciais armazenadas', () => {
            departamentoRegional.attemptsTo(
                Login.withStoredCredentials()
            );

            // Verificar se login foi bem-sucedido
            cy.contains('h1', 'Dashboard').should('be.visible');
        });
    });

    describe('Usando POM (Compatibilidade)', () => {
        it('Admin deve fazer login usando POM existente', () => {
            // Usar POM existente quando apropriado
            LoginActions.visit();
            LoginActions.loginAsAdmin();
            
            // POM já tem suas próprias validações
            LoginActions.checkLoginCookies();
        });
    });

    describe('Híbrido: Screenplay + POM', () => {
        it('Deve usar Screenplay para fluxo principal e POM para validações específicas', () => {
            // Usar Screenplay para o fluxo principal (mais legível)
            admin.attemptsTo(
                Login.asAdmin(),
                NavigateToAtendimento.page()
            );

            // Usar POM para validações específicas já implementadas
            // (evita reescrever validações complexas já testadas)
            LoginActions.checkLoginCookies();
            
            // Continuar com Screenplay
            cy.contains('h1', 'Atendimentos').should('be.visible');
        });
    });

    describe('Cenários de Context/Memory', () => {
        it('Deve armazenar e recuperar informações do contexto do ator', () => {
            // Armazenar dados customizados
            admin.remember('testeId', 'TESTE-001');
            admin.remember('dataInicio', new Date().toISOString());

            admin.attemptsTo(
                Login.asAdmin()
            );

            // Recuperar dados armazenados
            const testeId = admin.recall('testeId');
            const isLoggedIn = admin.recall('isLoggedIn'); // Armazenado pela task Login
            
            expect(testeId).to.equal('TESTE-001');
            expect(isLoggedIn).to.be.true;
        });
    });
});
