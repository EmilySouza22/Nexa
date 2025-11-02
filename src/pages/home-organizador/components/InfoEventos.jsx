import "./InfoEventos.css";
import { iconsHomeOrganizador } from "../../../utils/icons";


function InfoEventos() {
  return (
    <div className="info-eventos-container">
      <div className="info-card">
        <div className="info-header">
          <img
            src={iconsHomeOrganizador.relogio}
            alt="Relógio"
            className="info-icon"
          />
          <span className="info-label">Próximo evento em</span>
        </div>
        <div className="info-value">1 dia</div>
      </div>

      <div className="info-card">
        <div className="info-header">
          <img
            src={iconsHomeOrganizador.ingresso}
            alt="Ingresso"
            className="info-icon"
          />
          <span className="info-label">Ingressos Vendidos</span>
        </div>
        <div className="info-value">1200</div>
      </div>

      <div className="info-card">
        <div className="info-header">
          <img
            src={iconsHomeOrganizador.ingresso}
            alt="Ingresso"
            className="info-icon"
          />
          <span className="info-label">Ingressos Restantes</span>
        </div>
        <div className="info-value">800</div>
      </div>
    </div>
  );
}

export default InfoEventos;