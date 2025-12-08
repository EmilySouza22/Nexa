import { useState } from "react";
import "./Sidebar.css";
import { iconsSidebar } from "../utils/icons";

function Sidebar({ userType }) {
  /*Criação de uma Side bar que para diferenciar vamos usar props, de acordo com o tipo de usuário */

  const [isOpen, setIsOpen] = useState(false); /*Pra começar com ela fechada*/
  /*- isOpen: guarda se a sidebar está aberta (true) ou fechada (false)
     - setIsOpen: função para mudar o valor de isOpen */

  const setaSidebar = () => { /*função que abre e fecha a sidebar (é chamada quando eu clico no botão da seta)*/
    setIsOpen(!isOpen);
  };

  let sidebarClass = "sidebar"; /*pra guardar o nome no css*/
  if (isOpen) {
    sidebarClass = "sidebar aberta";
  } else {
    sidebarClass = "sidebar fechada";
  }

  let iconeSeta = iconsSidebar.seta; /*pra trocar o icon*/
  if (!isOpen) {
    iconeSeta = iconsSidebar.seta2;
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
          <img src={iconsSidebar.home} alt="Home" className="icon" />
          <span>Home</span>
        </a>
        {userType === "convidado" && (
          <>
            <a href="#" className="sidebar-link">
              <img src={iconsSidebar.ingresso} alt="Ingressos" className="icon" />
              <span>Meus ingressos</span>
            </a>
            <a href="#" className="sidebar-link">
              <img
                src={iconsSidebar.certificado}
                alt="Certificados"
                className="icon"
              />
              <span>Certificados</span>
            </a>
            <a href="#" className="sidebar-link">
              <img src={iconsSidebar.pesquisas} alt="Pesquisas" className="icon" />
              <span>Pesquisas</span>
            </a>
          </>
        )}
        {userType === "organizador" && (
          <>
            <a href="#" className="sidebar-link">
              <img src={iconsSidebar.comemoracao} alt="Eventos" className="icon" />
              <span>Meus eventos</span>
            </a>
            <a href="#" className="sidebar-link">
              <img src={iconsSidebar.calendario} alt="Novo evento" className="icon" />
              <span>Novo evento</span>
            </a>
            <a href="#" className="sidebar-link">
              <img src={iconsSidebar.dados} alt="Dados" className="icon" />
              <span>Dados</span>
            </a>
          </>
        )}
      </nav>
      <div className="sidebar-footer">
        <a href="#" className="sidebar-link">
          <img src={iconsSidebar.perfil} alt="Perfil" className="icon" />
          <span>Meu perfil</span>
        </a>
        <a href="#" className="sidebar-link">
          <img src={iconsSidebar.configuracoes} alt="Configurações" className="icon" />
          <span>Configurações</span>
        </a>
      </div>
    </aside>
  );
}

export default Sidebar;
