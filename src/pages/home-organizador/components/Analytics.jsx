import "./Analytics.css";
import { iconsHO } from "../../../utils/icons";
import exemploEvento from "../../../assets/home-organizador/exemplo-evento.png";

function Analytics() {
  return (
    <div className="analytics-section">
      <div className="analytics-header">
        <img
          src={iconsHO.analytics}
          alt="Analytics"
          className="analytics-icon"
        />
        <h2 className="analytics-titulo">Analytics</h2>
      </div>

      <div className="analytics-cards-container">
        <div className="analytics-card">
          <span className="analytics-card-label">Total de eventos</span>
          <span className="analytics-card-value">16</span>
        </div>

        <div className="analytics-card">
          <span className="analytics-card-label">Ingressos vendidos</span>
          <span className="analytics-card-value">820</span>
        </div>

        <div className="analytics-card">
          <span className="analytics-card-label">Receita total</span>
          <span className="analytics-card-value">R$1221,53</span>
        </div>

        <div className="analytics-card">
          <span className="analytics-card-label">Taxa média de ocupação</span>
          <span className="analytics-card-value">56%</span>
        </div>

        <div className="analytics-card">
          <span className="analytics-card-label">
            Eventos com lotação máxima
          </span>
          <span className="analytics-card-value">73%</span>
        </div>

        <div className="analytics-card analytics-card-evento">
          <span className="analytics-card-label">Evento mais lucrativo</span>
          <div className="evento-imagem">
            <img src={exemploEvento} alt="imagem-evento" />
          </div>
        </div>
      </div>

    </div>
  );
}

export default Analytics;
