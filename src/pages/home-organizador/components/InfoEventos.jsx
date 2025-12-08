import "./InfoEventos.css";
import { iconsHO } from "../../../utils/icons";
import { useState, useEffect } from "react";

function InfoEventos() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setErro(null);
        const idconta = sessionStorage.getItem("userId");

        if (!idconta) {
          setErro("ID da conta não encontrado");
          setLoading(false);
          return;
        }

        const url = `http://localhost:3000/api/eventos/organizador/${idconta}/dashboard`;
        const response = await fetch(url);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.error ||
              errorData.details ||
              "Erro ao buscar dados do dashboard"
          );
        }

        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        setErro(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // Função para formatar o texto de dias restantes
  const formatarDiasRestantes = (diasRestantes) => {
    if (diasRestantes === null || diasRestantes === undefined) return "N/A";
    if (diasRestantes === 0) return "Hoje";
    if (diasRestantes === 1) return "1 dia";
    if (diasRestantes < 0) return "Evento passado";
    return `${diasRestantes} dias`;
  };

  // Exibir loading
  if (loading) {
    return (
      <div className="info-eventos-container">
        <div className="info-card">
          <div className="info-header">
            <img src={iconsHO.relogio} alt="Relógio" className="info-icon" />
            <span className="info-label">Próximo evento em</span>
          </div>
          <div className="info-value">...</div>
        </div>

        <div className="info-card">
          <div className="info-header">
            <img
              src={iconsHO.ingresso}
              alt="Ingresso"
              className="info-icon-ingresso"
            />
            <span className="info-label">Ingressos Vendidos</span>
          </div>
          <div className="info-value">...</div>
        </div>

        <div className="info-card">
          <div className="info-header">
            <img
              src={iconsHO.ingresso}
              alt="Ingresso"
              className="info-icon-ingresso"
            />
            <span className="info-label">Ingressos Restantes</span>
          </div>
          <div className="info-value">...</div>
        </div>
      </div>
    );
  }

  // Exibir erro
  if (erro) {
    return (
      <div className="info-eventos-container">
        <div className="info-card" style={{ gridColumn: "1 / -1" }}>
          <p style={{ color: "red", textAlign: "center" }}>
            Erro ao carregar dados: {erro}
          </p>
        </div>
      </div>
    );
  }

  // Exibir dados ou mensagem quando não há eventos
  const proximoEvento = dashboardData?.proximo_evento;
  const ingressos = dashboardData?.ingressos || {
    total_vendidos: 0,
    total_restantes: 0,
  };

  return (
    <div className="info-eventos-container">
      <div className="info-card">
        <div className="info-header">
          <img src={iconsHO.relogio} alt="Relógio" className="info-icon" />
          <span className="info-label">Próximo evento em</span>
        </div>
        <div className="info-value">
          {proximoEvento
            ? formatarDiasRestantes(proximoEvento.dias_restantes)
            : "Sem eventos"}
        </div>
      </div>

      <div className="info-card">
        <div className="info-header">
          <img
            src={iconsHO.ingresso}
            alt="Ingresso"
            className="info-icon-ingresso"
          />
          <span className="info-label">Ingressos Vendidos</span>
        </div>
        <div className="info-value">{ingressos.total_vendidos}</div>
      </div>

      <div className="info-card">
        <div className="info-header">
          <img
            src={iconsHO.ingresso}
            alt="Ingresso"
            className="info-icon-ingresso"
          />
          <span className="info-label">Ingressos Restantes</span>
        </div>
        <div className="info-value">{ingressos.total_restantes}</div>
      </div>
    </div>
  );
}

export default InfoEventos;
