// Importa o componente de perfil do convidado
import PerfilConvidado from "../pages/perfil-convidado/PerfilConvidado";

// ========== ROTAS DO PERFIL DO CONVIDADO ==========
/**
 * Aqui ficam todas as rotas pertencentes ao convidado.
 * No caso, apenas a rota de "minha conta" (perfil).
 */

const perfilConvidadoRoutes = [
  {
    path: "/convidado/minha-conta",
    element: <PerfilConvidado />, // Renderiza o componente completo do perfil
  },
];


export default perfilConvidadoRoutes;