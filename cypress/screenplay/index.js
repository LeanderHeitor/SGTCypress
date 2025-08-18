// Actors
import Actor from './actors/Actor.js';
import Cast from './actors/Cast.js';

// Abilities
import BrowseTheWeb from './abilities/BrowseTheWeb.js';

// Interactions
import Click from './interactions/Click.js';
import Type from './interactions/Type.js';
import { Navigate, Reload } from './interactions/Navigate.js';

// Tasks
import { Login, VerifyRequiredFields } from './tasks/Login.js';
import { 
    NavigateToSection, 
    NavigateToAtendimento, 
    NavigateToClientes, 
    NavigateToDashboard 
} from './tasks/NavigateToSection.js';

// Questions
import TheText from './questions/TheText.js';
import { 
    TheVisibility, 
    TheExistence, 
    ThePageTitle, 
    TheCurrentUrl 
} from './questions/ElementQuestions.js';
import { 
    TheLoginState, 
    TheLoginError, 
    TheLoginCookies 
} from './questions/LoginQuestions.js';

/**
 * Screenplay Pattern - Índice Principal
 * 
 * Este arquivo facilita as importações nos testes, permitindo importar
 * tudo de uma vez ou itens específicos conforme necessário.
 * 
 * Uso nos testes:
 * 
 * // Importação completa
 * import { Cast, BrowseTheWeb, Login, Click, TheVisibility } from '../screenplay';
 * 
 * // Ou importação específica
 * import Login from '../screenplay/tasks/Login.js';
 */

export {
    // Actors
    Actor,
    Cast,
    
    // Abilities
    BrowseTheWeb,
    
    // Interactions
    Click,
    Type,
    Navigate,
    Reload,
    
    // Tasks
    Login,
    VerifyRequiredFields,
    NavigateToSection,
    NavigateToAtendimento,
    NavigateToClientes,
    NavigateToDashboard,
    
    // Questions
    TheText,
    TheVisibility,
    TheExistence,
    ThePageTitle,
    TheCurrentUrl,
    TheLoginState,
    TheLoginError,
    TheLoginCookies
};
