import { useState } from "react";
import "./Sidebar.css";
import { icons } from "../utils/icons";

function Sidebar({ userType }) {
  /*Criação de uma Side bar que para diferenciar vamos usar props, de acordo com o tipo de usuário */

  const [isOpen, setIsOpen] = useState(false); /*Pra começar com ela fechada*/

  const setaSidebar = () => {
    setIsOpen(!isOpen);
  };

  let sidebarClass = "sidebar";
  if (isOpen) {
    sidebarClass = "sidebar aberta";
  } else {
    sidebarClass = "sidebar fechada";
  }

  let iconeSeta = icons.seta;
  if (!isOpen) {
    iconeSeta = icons.seta2;
  }

  return (
    <aside className={sidebarClass}>
      <div className="sidebar-header">
        <h3>Seções</h3>
        <button className="sidebar-button" onClick={setaSidebar}>
          <img src={iconeSeta} alt="Toggle" />
        </button>
      </div>
      <nav className="sidebar-nav">
        <a href="#" className="sidebar-link">
          <img src={icons.home} alt="Home" className="icon" />
          <span>Home</span>
        </a>
        {userType === "convidado" && (
          <>
            <a href="#" className="sidebar-link">
              <img src={icons.ingresso} alt="Ingressos" className="icon" />
              <span>Meus ingressos</span>
            </a>
            <a href="#" className="sidebar-link">
              <img src={icons.microfone} alt="Palco" className="icon" />
              <span>Palco principal</span>
            </a>
            <a href="#" className="sidebar-link">
              <img
                src={icons.certificado}
                alt="Certificados"
                className="icon"
              />
              <span>Certificados</span>
            </a>
            <a href="#" className="sidebar-link">
              <img src={icons.pesquisas} alt="Pesquisas" className="icon" />
              <span>Pesquisas</span>
            </a>
          </>
        )}
        {userType === "organizador" && (
          <>
            <a href="#" className="sidebar-link">
              <img src={icons.comemoracao} alt="Eventos" className="icon" />
              <span>Meus eventos</span>
            </a>
            <a href="#" className="sidebar-link">
              <img src={icons.calendario} alt="Novo evento" className="icon" />
              <span>Novo evento</span>
            </a>
            <a href="#" className="sidebar-link">
              <img src={icons.dados} alt="Dados" className="icon" />
              <span>Dados</span>
            </a>
          </>
        )}
      </nav>
      <div className="sidebar-footer">
        <a href="#" className="sidebar-link">
          <img src={icons.perfil} alt="Perfil" className="icon" />
          <span>Meu perfil</span>
        </a>
        <a href="#" className="sidebar-link">
          <img src={icons.configuracoes} alt="Configurações" className="icon" />
          <span>Configurações</span>
        </a>
      </div>
    </aside>
  );
}

export default Sidebar;