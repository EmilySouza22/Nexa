import Cadastro from "../pages/register/Register";
import Login from "../pages/login/Login"

const authRoutes = [
  { path: "/register", element: <Cadastro /> },
  { path: "/cadastro", element: <Cadastro /> },
  { path: "/login", element: <Login /> }, // só ate arrumar
];

export default authRoutes;


