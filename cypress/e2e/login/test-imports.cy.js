/**
 * 🧪 TESTE SIMPLES: Verificar se imports Screenplay funcionam
 */

// 📦 Imports Screenplay Pattern
import { Cast, Login } from '../../screenplay/index.js';

// 📦 Imports POM (para validações específicas)
import LoginActions from '../../support/pages/login/loginActions';

describe('🔧 Teste de Imports - Screenplay', () => {
    let admin;

    beforeEach(() => {
        // 🎭 Criar ator do Screenplay
        admin = Cast.actorNamed('Admin').withCredentials('admin');
    });

    it('deve importar e usar classes Screenplay corretamente', () => {
        // 🎬 SCREENPLAY: Teste básico de login
        admin.attemptsTo(
            Login.asAdmin().withFlexibleValidation()
        );

        // 📊 Log de sucesso
        cy.log('✅ Imports funcionando - Screenplay Pattern ativo');
        
        // 🏠 POM: Verificação adicional
        LoginActions.checkLoginCookies();
    });

    it('deve funcionar navegação básica', () => {
        // Teste básico sem Screenplay para comparação
        LoginActions.visit();
        LoginActions.loginAsAdmin();
        
        cy.log('✅ POM funcionando normalmente');
    });
});
