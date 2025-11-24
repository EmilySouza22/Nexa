import Cadastro from "../pages/register/Register";

const authRoutes = [
  { path: "/register", element: <Cadastro /> },
  { path: "/cadastro", element: <Cadastro /> },
  { path: "/login", element: <div>Tela de login (em breve)</div> }, // só ate arrumar
];

export default authRoutes;
