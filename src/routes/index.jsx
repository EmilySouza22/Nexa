import { createBrowserRouter } from "react-router-dom";
import HomeConvidado from "../pages/home-convidado/HomeConvidado";
import HomeOrganizador from "../pages/home-organizador/HomeOrganizador";
import authRoutes from "./authRoutes";

const router = createBrowserRouter([
  { path: "/", element: <HomeConvidado /> },
  { path: "/organizador", element: <HomeOrganizador /> },
  ...authRoutes,
]);

export default router;
