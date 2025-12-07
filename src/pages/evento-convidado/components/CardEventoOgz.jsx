import { icones } from "../../../utils/iconEventoConvidado";
import "./CardEventoOgz.css";
import exemploEvento from "../../../assets/home-organizador/exemplo-evento.png";

function CardEventoOgz({ evento }) {
  // Se não tiver evento, mostra loading
  if (!evento) {
    return (
      <div className="card-evento-detalhes-container-ogz">
        <div className="info-card-evento-ogz">
          <p>Carregando informações do evento...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card-evento-detalhes-container-ogz">
      <div className="info-card-evento-ogz">
        <div className="info-evento-imagem-ogz">
          <img 
            src={evento.bannerUrl || exemploEvento} 
            alt={evento.nome || "imagem-evento"}
            onError={(e) => {
              // Se a imagem falhar ao carregar, usa a imagem de exemplo
              e.target.src = exemploEvento;
            }}
          />
        </div>
        
        <div className="info-evento-content-ogz">
          <h2 className="info-evento-titulo-ogz">
            {evento.nome || "Nome do evento"}
          </h2>
          
          {/* DATA */}
          <div className="info-header-evento-ogz">
            <img
              src={icones.data}
              alt="data"
              className="info-icon-evento-ogz"
            />
            <span className="info-label-evento-ogz">
              {evento.data || "Data não informada"}
            </span>
          </div>
          
          {/* HORÁRIO */}
          <div className="info-header-evento-ogz">
            <img
              src={icones.hora}
              alt="hora"
              className="info-icon-evento-ogz"
            />
            <span className="info-label-evento-ogz">
              {evento.hora || "Horário não informado"}
            </span>
          </div>
          
          {/* LOCAL */}
          <div className="info-header-evento-ogz">
            <img
              src={icones.local_cinza}
              alt="local"
              className="info-icon-evento-ogz"
            />
            <span className="info-label-evento-ogz">
              {evento.local?.nome && evento.local?.endereco 
                ? `${evento.local.nome} - ${evento.local.endereco}`
                : "Local não informado"}
            </span>
          </div>
          
          {/* BOTÃO COMPRAR */}
          <div className="evento-organizador">
            <button className="btn-ingresso-ogz">
              Comprar Ingresso
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardEventoOgz;
