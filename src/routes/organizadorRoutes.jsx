import CriarEvento from "../pages/criacao-evento/CriacaoEvento";

const organizadorRoutes = [
  { path: "/criar-evento", element: <CriarEvento /> },
  { path: "/organizador/meus-eventos", element: <div>Meus Eventos</div> },
  // outras rotas de organizador
];

export default organizadorRoutes;