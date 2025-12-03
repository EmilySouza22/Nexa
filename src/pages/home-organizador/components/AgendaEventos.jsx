import "./AgendaEventos.css";
import { iconsHO } from "../../../utils/icons";
import evento1 from "../../../assets/home-organizador/exemplo-evento.png";
import evento2 from "../../../assets/home-organizador/evento2.png";
import evento3 from "../../../assets/home-organizador/evento3.png";
import evento4 from "../../../assets/home-organizador/evento4.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

// Dados mockados - futuramente virão do backend
const eventosMock = [
  {
    id: 1,
    imagem: evento1,
    diasRestantes: 1,
    data: new Date(2025, 11, 3), // 3 de dezembro de 2025
  },
  {
    id: 2,
    imagem: evento2,
    diasRestantes: 15,
    data: new Date(2025, 11, 17), // 17 de dezembro de 2025
  },
  {
    id: 3,
    imagem: evento3,
    diasRestantes: 30,
    data: new Date(2026, 0, 1), // 1 de janeiro de 2026
  },
  {
    id: 4,
    imagem: evento4,
    diasRestantes: 45,
    data: new Date(2026, 0, 16), // 16 de janeiro de 2026
  },
];

/*== AGENDA == */
function AgendaEventos() {
  // Iniciar com o mês ATUAL (não mais mockado)
  const [mesAtual, setMesAtual] = useState(new Date());
  const hoje = new Date();
  const navigate = useNavigate(); 

  // Função para formatar o texto de dias
  const formatarDias = (dias) => {
    if (dias === 1) return "1 dia";
    return `${dias} dias`;
  };

  const handleCriarEvento = () => {
    // Futuramente abrirá modal ou redireciona para página de criar evento
    navigate("/criar-evento"); // Redireciona para a rota de criar evento
  };

  // Função para gerar os dias do calendário
  const gerarDiasCalendario = () => {
    const ano = mesAtual.getFullYear();
    const mes = mesAtual.getMonth();

    // Primeiro dia do mês
    const primeiroDia = new Date(ano, mes, 1);
    // Último dia do mês
    const ultimoDia = new Date(ano, mes + 1, 0);

    // Dia da semana do primeiro dia (0 = domingo, 6 = sábado)
    const diaSemanaInicio = primeiroDia.getDay();

    const dias = [];

    // Adiciona células vazias antes do primeiro dia
    for (let i = 0; i < diaSemanaInicio; i++) {
      dias.push(null);
    }

    // Adiciona os dias do mês
    for (let dia = 1; dia <= ultimoDia.getDate(); dia++) {
      dias.push(dia);
    }

    return dias;
  };

  // Função para verificar se um dia tem evento
  const diaTemEvento = (dia) => {
    if (!dia) return false;

    return eventosMock.some((evento) => {
      return (
        evento.data.getDate() === dia &&
        evento.data.getMonth() === mesAtual.getMonth() &&
        evento.data.getFullYear() === mesAtual.getFullYear()
      );
    });
  };

  // Função para verificar se é o dia atual
  const ehDiaAtual = (dia) => {
    if (!dia) return false;

    return (
      dia === hoje.getDate() &&
      mesAtual.getMonth() === hoje.getMonth() &&
      mesAtual.getFullYear() === hoje.getFullYear()
    );
  };

  // Função para navegar entre meses
  const mesAnterior = () => {
    setMesAtual(new Date(mesAtual.getFullYear(), mesAtual.getMonth() - 1, 1));
  };

  const proximoMes = () => {
    setMesAtual(new Date(mesAtual.getFullYear(), mesAtual.getMonth() + 1, 1));
  };

  // Função para formatar o nome do mês
  const formatarMesAno = () => {
    const meses = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    return `${meses[mesAtual.getMonth()]} ${mesAtual.getFullYear()}`;
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
          <div className="agenda-calendario-wrapper">
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
                {gerarDiasCalendario().map((dia, index) => (
                  <div
                    key={index}
                    className={`calendario-numero ${
                      diaTemEvento(dia) ? "calendario-numero-evento" : ""
                    } ${ehDiaAtual(dia) ? "calendario-numero-atual" : ""}`}
                  >
                    {dia || ""}
                  </div>
                ))}
              </div>
            </div>

            {/* Barra do mês abaixo do calendário */}
            <div className="calendario-mes">
              <button className="calendario-seta" onClick={mesAnterior}>
                ‹
              </button>
              <span className="calendario-mes-texto">{formatarMesAno()}</span>
              <button className="calendario-seta" onClick={proximoMes}>
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgendaEventos;
