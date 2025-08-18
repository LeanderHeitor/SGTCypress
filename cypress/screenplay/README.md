# Screenplay Pattern - Guia de Implementação

## Visão Geral

Este projeto implementa o padrão Screenplay alongside ao POM (Page Object Model) existente, permitindo coexistência e evolução gradual da arquitetura de testes.

## Estrutura da Arquitetura

```
cypress/screenplay/
├── actors/           # Gerenciamento de usuários/atores
├── abilities/        # Habilidades fundamentais (BrowseTheWeb, etc.)
├── interactions/     # Ações básicas (Click, Type, Navigate)
├── tasks/           # Fluxos de negócio completos
├── questions/       # Verificações e asserções
└── index.js         # Importações centralizadas
```

## Conceitos Fundamentais

### 1. **Actor (Ator)**
- Representa um usuário do sistema
- Possui habilidades, contexto e pode executar tarefas
- Exemplo: Admin, DepartamentoRegional, Laboratorista

### 2. **Abilities (Habilidades)**
- Capacidades fundamentais dos atores
- `BrowseTheWeb`: Interação com navegador
- Extensível para outras habilidades (API calls, Database, etc.)

### 3. **Interactions (Interações)**
- Ações básicas e atômicas
- `Click`, `Type`, `Navigate`
- Reutilizáveis e compostas em Tasks

### 4. **Tasks (Tarefas)**
- Fluxos de negócio completos
- Compostas de várias interações
- Exemplo: `Login`, `NavigateToSection`

### 5. **Questions (Perguntas)**
- Verificações sobre o estado do sistema
- Retornam informações ou boolean
- Exemplo: `TheVisibility`, `TheText`

## Coexistência POM + Screenplay

### Quando Usar Cada Padrão

**Use Screenplay para:**
- ✅ Novos testes e funcionalidades
- ✅ Fluxos de negócio complexos
- ✅ Testes que precisam de múltiplos atores
- ✅ Cenários que requerem alta legibilidade

**Use POM para:**
- ✅ Funcionalidades já implementadas e estáveis
- ✅ Validações específicas complexas
- ✅ Elementos/seletores já mapeados
- ✅ Quando não há necessidade de refatoração

**Abordagem Híbrida:**
```javascript
// Screenplay para fluxo principal
await admin.attemptsTo(
    Login.asAdmin(),
    NavigateToSection.to('/atendimento', 'Atendimentos')
);

// POM para validações específicas já implementadas
LoginActions.checkLoginCookies();
```

## Exemplo de Uso

```javascript
import { Cast, BrowseTheWeb, Login, NavigateToAtendimento } from '../screenplay';

describe('Teste com Screenplay', () => {
    let admin;

    beforeEach(() => {
        admin = Cast.admin('João').whoCan(BrowseTheWeb.using());
    });

    it('deve realizar fluxo completo', async () => {
        await admin.attemptsTo(
            Login.asAdmin(),
            NavigateToAtendimento.page()
        );

        const isVisible = await admin.asks(
            TheVisibility.of('h1:contains("Atendimentos")')
        );
        
        expect(isVisible).to.be.true;
    });
});
```

## Boas Práticas

### 1. **Nomeação Clara**
- Actors: Nomes representativos (`admin`, `departamentoRegional`)
- Tasks: Verbos de ação (`Login`, `NavigateToSection`)
- Questions: Formato pergunta (`TheVisibility`, `TheText`)

### 2. **Responsabilidades Bem Definidas**
- **Interactions**: Apenas ações básicas
- **Tasks**: Fluxos de negócio completos
- **Questions**: Apenas verificações, sem ações

### 3. **Reutilização e Composição**
- Tasks compostas de Interactions
- Interactions reutilizáveis
- Questions independentes

### 4. **Gerenciamento de Estado**
- Use `actor.remember()` para armazenar contexto
- Use `actor.recall()` para recuperar informações
- Limpe contexto entre testes

## Migração Gradual

### Fase 1: Implementação Base ✅
- [x] Estrutura de pastas
- [x] Classes fundamentais
- [x] Exemplo funcional

### Fase 2: Expansão (Próximos Passos)
- [ ] Mais Tasks específicas do domínio
- [ ] Questions para validações complexas
- [ ] Abilities adicionais (API, Database)

### Fase 3: Migração
- [ ] Converter testes críticos para Screenplay
- [ ] Manter POM para casos específicos
- [ ] Documentar padrões híbridos

## Evitando Duplicação

### 1. **Seletores Compartilhados**
```javascript
// Criar arquivo de seletores compartilhados
const SELECTORS = {
    LOGIN: {
        EMAIL: '[data-testid="email"]',
        PASSWORD: '[data-testid="password"]',
        BUTTON: '[data-testid="login-btn"]'
    }
};

// Usar tanto no POM quanto no Screenplay
```

### 2. **Utilitários Compartilhados**
```javascript
// Reutilizar lógicas de validação existentes
import { validateLoginSuccess } from '../support/utils/validations.js';

// Usar em ambos os padrões
```

### 3. **Configurações Centralizadas**
```javascript
// cypress.env.json já centraliza configurações
// Ambos os padrões usam Cypress.env()
```

## Troubleshooting

### Problema: "Actor does not have ability"
```javascript
// Solução: Sempre conceder habilidades necessárias
const actor = Cast.admin().whoCan(BrowseTheWeb.using());
```

### Problema: Conflito entre POM e Screenplay
```javascript
// Solução: Use namespaces ou prefixos claros
import LoginPOM from '../support/pages/login/loginActions.js';
import LoginScreenplay from '../screenplay/tasks/Login.js';
```

### Problema: Testes lentos
```javascript
// Solução: Reutilize atores e evite setup desnecessário
// Use beforeEach apenas quando necessário
```

## Extensibilidade Futura

A arquitetura permite extensões como:
- **API Abilities**: Para testes de integração
- **Database Abilities**: Para setup/teardown de dados
- **Custom Interactions**: Para componentes específicos
- **Domain Tasks**: Para fluxos específicos do negócio
- **Advanced Questions**: Para validações complexas

---

**Nota**: Esta implementação prioriza simplicidade e coexistência com o código existente, permitindo evolução gradual sem breaking changes.
