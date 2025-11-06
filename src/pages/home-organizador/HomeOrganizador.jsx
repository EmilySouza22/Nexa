import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import CardEvento from "./components/CardEvento";
import InfoEventos from "./components/InfoEventos";
import "./HomeOrganizador.css";

function HomeOrganizador() {
  // Depois esses dados vão vir do backend, aqui deixei mockado
  const userName = "Organizadora Emily";
  const userInitials = "EA";

  return (
    <div className="home-organizador">
      <Navbar userName={userName} userInitials={userInitials} />
      <div className="home-organizador-layout">
        <Sidebar userType="organizador" />
        <main className="home-organizador-content">
          <InfoEventos />
          <CardEvento />
        </main>
      </div>
    </div>
  );
}

export default HomeOrganizador;
