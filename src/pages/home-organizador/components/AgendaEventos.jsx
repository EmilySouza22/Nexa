import "./AgendaEventos.css";
import { iconsHO } from "../../../utils/icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/*== AGENDA == */
function AgendaEventos() {
  const [mesAtual, setMesAtual] = useState(new Date());
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imagensComErro, setImagensComErro] = useState(new Set());
  const [erro, setErro] = useState(null);
  const hoje = new Date();
  const navigate = useNavigate();

  // Buscar eventos do organizador do backend
  useEffect(() => {
    const fetchEventos = async () => {
      try {
        setLoading(true);
        setErro(null);
        const idconta = sessionStorage.getItem("userId");

        if (!idconta) {
          setErro("ID da conta não encontrado");
          setLoading(false);
          return;
        }

        const url = `http://localhost:3000/api/eventos/organizador/${idconta}`;
        const response = await fetch(url);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.error || errorData.details || "Erro ao buscar eventos"
          );
        }

        const data = await response.json();

        if (data.length === 0) {
          setEventos([]);
          setLoading(false);
          return;
        }

        // Função para garantir que a imagem tenha o prefixo correto
        const formatarImagemBase64 = (imagemBase64) => {
          if (!imagemBase64) return null;

          if (imagemBase64.startsWith("data:image")) {
            return imagemBase64;
          }

          return `data:image/jpeg;base64,${imagemBase64}`;
        };

        // Mapeia os eventos do backend para o formato que o componente espera
        const eventosFormatados = data.map((evento) => ({
          id: evento.idevento,
          nome: evento.nome,
          imagem: formatarImagemBase64(evento.imagem),
          diasRestantes: evento.dias_restantes || 0,
          data: new Date(evento.data_inicio),
          data_termino: new Date(evento.data_termino),
          categoria: evento.nome_categoria,
          local: evento.local,
          cidade: evento.cidade,
          estado: evento.estado,
        }));

        setEventos(eventosFormatados);
      } catch (error) {
        setErro(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventos();
  }, []);

  // Filtrar apenas eventos ativos (que ainda não passaram)
  const eventosAtivos = eventos.filter((evento) => {
    const dataTermino = evento.data_termino || evento.data;
    // Normaliza as datas para meia-noite para comparação correta
    const dataTerminoNormalizada = new Date(dataTermino);
    dataTerminoNormalizada.setHours(0, 0, 0, 0);
    const hojeNormalizado = new Date(hoje);
    hojeNormalizado.setHours(0, 0, 0, 0);

    return dataTerminoNormalizada >= hojeNormalizado;
  });

  // Verifica se deve mostrar o card de criar evento
  const mostrarCardCriar = eventosAtivos.length < 5;

  // Função para tratar erro de carregamento de imagem
  const handleImageError = (eventoId) => {
    setImagensComErro((prev) => new Set([...prev, eventoId]));
  };

  // Função para formatar o texto de dias
  const formatarDias = (dias) => {
    if (dias === 0) return "Hoje";
    if (dias === 1) return "1 dia";
    return `${dias} dias`;
  };

  const handleCriarEvento = () => {
    navigate("/criar-evento");
  };

  // Função para gerar os dias do calendário
  const gerarDiasCalendario = () => {
    const ano = mesAtual.getFullYear();
    const mes = mesAtual.getMonth();
    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0);
    const diaSemanaInicio = primeiroDia.getDay();
    const dias = [];

    for (let i = 0; i < diaSemanaInicio; i++) {
      dias.push(null);
    }

    for (let dia = 1; dia <= ultimoDia.getDate(); dia++) {
      dias.push(dia);
    }

    return dias;
  };

  // Função para verificar se um dia tem evento
  const diaTemEvento = (dia) => {
    if (!dia) return false;

    return eventos.some((evento) => {
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

  // Exibe loading enquanto busca os eventos
  if (loading) {
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
          <p>Carregando eventos...</p>
        </div>
      </div>
    );
  }

  // Exibe erro se houver
  if (erro) {
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
          <p style={{ color: "red" }}>Erro ao carregar eventos: {erro}</p>
          <button onClick={() => window.location.reload()}>
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

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
        <div className="agenda-eventos-grid">
          {/* Mostra os primeiros 5 eventos ativos */}
          {eventosAtivos.slice(0, 5).map((evento) => (
            <div key={evento.id} className="agenda-evento-card">
              {evento.imagem && !imagensComErro.has(evento.id) ? (
                <img
                  src={evento.imagem}
                  alt={evento.nome}
                  className="agenda-evento-imagem"
                  onError={() => handleImageError(evento.id)}
                />
              ) : (
                <div className="agenda-evento-sem-imagem">
                  <span>{evento.nome}</span>
                </div>
              )}
              <div className="agenda-evento-badge">
                <span>{formatarDias(evento.diasRestantes)}</span>
              </div>
            </div>
          ))}

          {/* Card de criar evento - só aparece se houver menos de 5 eventos ativos */}
          {mostrarCardCriar && (
            <div
              className="agenda-criar-evento-card"
              onClick={handleCriarEvento}
            >
              <button className="criar-evento-button">
                <img
                  src={iconsHO.add2}
                  alt="Adicionar"
                  className="criar-evento-icon"
                />
                Criar evento
              </button>
            </div>
          )}

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
