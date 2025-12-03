import { icones } from "../../../utils/iconEventoConvidado";
import "./SobreOrganizador.css";

function SobreOrganizador({ evento }) {
  return (
    <div className="sobre-organizador-container">
      <div className="organizador-header">
        <img 
          src={icones.sobre_organizador} 
          alt="sobre organizador" 
          className="organizador-icon"
        />
        <h3>Sobre o Organizador</h3>
      </div>

      <div className="organizador-content">
        <div className="organizador-logo-wrapper">
          <img
            src={evento.organizadorLogo}
            alt="logo organizador"
            className="organizador-logo"
          />
        </div>

        <div className="organizador-info">
          <h4 className="organizador-nome">{evento.organizadorNome}</h4>
          <p className="organizador-descricao">{evento.organizadorDescricao}</p>

          <div className="organizador-acoes">
            <button className="btn-organizador btn-falar">
              <img src={icones.email} alt="email" />
              Falar com o organizador
            </button>

            <button className="btn-organizador btn-mais-eventos">
              <img src={icones.local_mais_evento} alt="mais eventos" />
              Mais eventos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SobreOrganizador;