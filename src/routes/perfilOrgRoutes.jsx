import PerfilOrganizador from "../pages/perfil-organizador/PerfilOrganizador";
import MinhaContaOrg from "../pages/perfil-organizador/MinhaContaOrg";

const perfilRoutes = [
  {
    path: "/organizador/perfil",
    element: <PerfilOrganizador />,
  },
  {
    path: "/organizador/minha-conta",
    element: <MinhaContaOrg />,
  },
];

export default perfilRoutes;