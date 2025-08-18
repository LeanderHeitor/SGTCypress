/**
 * 🧪 TESTE SIMPLES CORRIGIDO: Verificar Screenplay Pattern
 */

// 📦 Imports Screenplay Pattern
import { Cast, Login, BrowseTheWeb, TheLoginState } from '../../screenplay/index.js';

// 📦 Imports POM (para validações específicas)
import LoginActions from '../../support/pages/login/loginActions';

describe('🔧 Teste Corrigido - Screenplay + POM', () => {
    let admin;

    beforeEach(() => {
        // 🎭 Criar ator do Screenplay com habilidades
        admin = Cast.actorNamed('Admin').withCredentials('admin');
        admin.whoCan(BrowseTheWeb.using());
    });

    it('deve fazer login usando Screenplay corrigido', () => {
        // 🎬 SCREENPLAY: Login simples
        admin.attemptsTo(
            Login.asAdmin()
        );

        // 🎭 SCREENPLAY: Verificar estado
        admin.asks(TheLoginState.ofCurrentUser().isLoggedIn());

        // 📊 Log de sucesso
        cy.log('✅ Screenplay + POM funcionando corretamente');
        
        // 🏠 POM: Verificação adicional
        LoginActions.checkLoginCookies();
    });

    it('deve fazer login apenas com POM para comparação', () => {
        // 🏠 POM: Login tradicional
        LoginActions.visit();
        LoginActions.loginAsAdmin();
        
        cy.log('✅ POM tradicional funcionando normalmente');
    });
});
