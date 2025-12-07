import { createBrowserRouter } from "react-router-dom";
import HomeConvidado from "../pages/home-convidado/HomeConvidado";
import HomeOrganizador from "../pages/home-organizador/HomeOrganizador";
import EventoConvidado from "../pages/evento-convidado/EventoConvidado";
import authRoutes from "./authRoutes";
import organizadorRoutes from "./organizadorRoutes";

const router = createBrowserRouter([
  { path: "/", element: <HomeConvidado /> },
  { path: "/organizador", element: <HomeOrganizador /> },
  { path: "/evento/:id", element: <EventoConvidado /> },
  ...authRoutes,
  ...organizadorRoutes,
]);

export default router;