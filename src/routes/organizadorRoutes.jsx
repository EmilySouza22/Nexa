import CriarEvento from "../pages/criacao-evento/CriacaoEvento";
import EdicaoEvento from "../pages/edicao-evento/EdicaoEvento";

const organizadorRoutes = [
  { path: "/criar-evento", element: <CriarEvento /> },
  { path: "/edicao-evento/:idevento", element: <EdicaoEvento /> }, // Rota real (com ID)
  { path: "/organizador/meus-eventos", element: <div>Meus Eventos</div> },
];

export default organizadorRoutes;