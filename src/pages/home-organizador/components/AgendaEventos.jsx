import "./AgendaEventos.css";
import { iconsHO } from "../../../utils/icons";
import evento1 from "../../../assets/home-organizador/exemplo-evento.png";
import evento2 from "../../../assets/home-organizador/evento2.png";
import evento3 from "../../../assets/home-organizador/evento3.png";
import evento4 from "../../../assets/home-organizador/evento4.png";

// Dados mockados - futuramente virão do backend
const eventosMock = [
  {
    id: 1,
    imagem: evento1,
    diasRestantes: 1,
  },
  {
    id: 2,
    imagem: evento2,
    diasRestantes: 15,
  },
  {
    id: 3,
    imagem: evento3,
    diasRestantes: 30,
  },
  {
    id: 4,
    imagem: evento4,
    diasRestantes: 45,
  },
];

function AgendaEventos() {
  // Função para formatar o texto de dias
  const formatarDias = (dias) => {
    if (dias === 1) return "1 dia";
    return `${dias} dias`;
  };

  const handleCriarEvento = () => {
    // Futuramente abrirá modal ou redireciona para página de criar evento
    console.log("Criar novo evento");
  };

  return (
    <div className="agenda-section">
      <div className="agenda-header">
        <img
          src={iconsHO.calendario}
          alt="Calendário"
          className="agenda-icon"
        />
        <h2 className="agenda-titulo">Agenda de eventos</h2>
      </div>

      <div className="agenda-content">
        {/* Grid unificado - eventos + calendário */}
        <div className="agenda-eventos-grid">
          {eventosMock.map((evento) => (
            <div key={evento.id} className="agenda-evento-card">
              <img
                src={evento.imagem}
                alt={`Evento ${evento.id}`}
                className="agenda-evento-imagem"
              />
              <div className="agenda-evento-badge">
                <span>{formatarDias(evento.diasRestantes)}</span>
              </div>
            </div>
          ))}

          {/* Card de Criar Evento */}
          <div className="agenda-criar-evento-card" onClick={handleCriarEvento}>
            <button className="criar-evento-button">
              <img
                src={iconsHO.add2}
                alt="Adicionar"
                className="criar-evento-icon"
              />
              Criar evento
            </button>
          </div>

          {/* Calendário na posição 6 do grid (linha 2, coluna 3) */}
          <div className="agenda-calendario">
            <div className="calendario-header">
              <span className="calendario-dia">D</span>
              <span className="calendario-dia">S</span>
              <span className="calendario-dia">T</span>
              <span className="calendario-dia">Q</span>
              <span className="calendario-dia">Q</span>
              <span className="calendario-dia">S</span>
              <span className="calendario-dia">S</span>
            </div>

            <div className="calendario-grid">
              {/* Mockado - futuramente será gerado dinamicamente */}
              {Array.from({ length: 30 }, (_, i) => i + 1).map((dia) => (
                <div
                  key={dia}
                  className={`calendario-numero ${
                    dia === 2 || dia === 16 ? "calendario-numero-evento" : ""
                  } ${dia === 16 ? "calendario-numero-atual" : ""}`}
                >
                  {dia}
                </div>
              ))}
            </div>

            <div className="calendario-mes">
              <button className="calendario-seta">‹</button>
              <span className="calendario-mes-texto">Setembro 2025</span>
              <button className="calendario-seta">›</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgendaEventos;
