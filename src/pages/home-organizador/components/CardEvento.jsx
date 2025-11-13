import "./CardEvento.css";
import { iconsHO } from "../../../utils/icons";
import exemploEvento from "../../../assets/home-organizador/exemplo-evento.png";

function CardEvento() {
  return (
    <div className="card-evento-detalhes-container">
      <div className="info-card-evento">
        <div className="info-evento-imagem">
          <img src={exemploEvento} alt="imagem-evento" />
        </div>

        <div className="info-evento-content">
          <h2 className="info-evento-titulo">Conecta Sul</h2>

          <div className="info-header-evento">
            <img
              src={iconsHO.assunto}
              alt="assunto"
              className="info-icon-evento"
            />
            <span className="info-label-evento">
              7º Fórum de Inteligência e Compras Estratégicas do Sul do Brasil
            </span>
          </div>

          <div className="info-header-evento">
            <img
              src={iconsHO.calendario}
              alt="calendario"
              className="info-icon-evento"
            />
            <span className="info-label-evento">
              23 de Outubro à 27 de Outubro
            </span>
          </div>

          <div className="info-header-evento">
            <img
              src={iconsHO.relogio2}
              alt="relogio2"
              className="info-icon-evento"
            />
            <span className="info-label-evento">
              Quinta, Sexta às 20h00, Sábado às 16h00, Domingo às 15h00
            </span>
          </div>

          <div className="info-header-evento">
            <img src={iconsHO.local} alt="local" className="info-icon-evento" />
            <span className="info-label-evento">
              Teatro Santander - Avenida Presidente Juscelino Kubitschek, 2041,
              São Paulo - SP
            </span>
          </div>

          <div className="info-header-evento">
            <img src={iconsHO.timer} alt="timer" className="info-icon-evento" />
            <span className="info-label-evento">2h30min</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardEvento;
