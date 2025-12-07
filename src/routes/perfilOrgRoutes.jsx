import PerfilOrganizador from "../pages/perfil-organizador/PerfilOrganizador";
import MinhaContaOrg from "../pages/perfil-organizador/MinhaContaOrg";

const perfilOrgRoutes = [
  {
    path: "/organizador/perfil",
    element: <PerfilOrganizador />,
  },
  {
    path: "/organizador/minha-conta",
    element: <MinhaContaOrg />,
  },
];

export default perfilOrgRoutes;