import "./Analytics.css";
import { iconsHO } from "../../../utils/icons";
import { useState, useEffect } from "react";

function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [imagemComErro, setImagemComErro] = useState(false);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setErro(null);
        const idconta = sessionStorage.getItem("userId");

        if (!idconta) {
          setErro("ID da conta não encontrado");
          setLoading(false);
          return;
        }

        const url = `http://localhost:3000/api/eventos/organizador/${idconta}/analytics`;
        const response = await fetch(url);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.error || errorData.details || "Erro ao buscar analytics"
          );
        }

        const data = await response.json();
        setAnalytics(data);
      } catch (error) {
        setErro(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  // Formatar valor monetário
  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  // Formatar imagem base64
  const formatarImagemBase64 = (imagemBase64) => {
    if (!imagemBase64) return null;
    if (imagemBase64.startsWith("data:image")) {
      return imagemBase64;
    }
    return `data:image/jpeg;base64,${imagemBase64}`;
  };

  // Tratamento de erro de imagem
  const handleImageError = () => {
    setImagemComErro(true);
  };

  if (loading) {
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
          <p style={{ gridColumn: "1 / -1", textAlign: "center" }}>
            Carregando analytics...
          </p>
        </div>
      </div>
    );
  }

  if (erro) {
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
          <p
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              color: "red",
            }}
          >
            Erro ao carregar analytics: {erro}
          </p>
        </div>
      </div>
    );
  }

  const eventoLucrativo = analytics?.evento_mais_lucrativo;
  const imagemEvento = eventoLucrativo
    ? formatarImagemBase64(eventoLucrativo.imagem)
    : null;

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
          <span className="analytics-card-value">
            {analytics?.total_eventos || 0}
          </span>
        </div>

        <div className="analytics-card">
          <span className="analytics-card-label">Ingressos vendidos</span>
          <span className="analytics-card-value">
            {analytics?.ingressos_vendidos || 0}
          </span>
        </div>

        <div className="analytics-card">
          <span className="analytics-card-label">Receita total</span>
          <span className="analytics-card-value">
            {formatarMoeda(analytics?.receita_total || 0)}
          </span>
        </div>

        <div className="analytics-card">
          <span className="analytics-card-label">Taxa média de ocupação</span>
          <span className="analytics-card-value">
            {analytics?.taxa_ocupacao || 0}%
          </span>
        </div>

        <div className="analytics-card">
          <span className="analytics-card-label">
            Eventos com lotação máxima
          </span>
          <span className="analytics-card-value">
            {analytics?.percentual_lotacao || 0}%
          </span>
        </div>

        <div className="analytics-card analytics-card-evento">
          <span className="analytics-card-label">Evento mais lucrativo</span>
          {eventoLucrativo ? (
            <div className="evento-imagem">
              {imagemEvento && !imagemComErro ? (
                <img
                  src={imagemEvento}
                  alt={eventoLucrativo.nome}
                  onError={handleImageError}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "150px",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    textAlign: "center",
                    padding: "1rem",
                  }}
                >
                  {eventoLucrativo.nome}
                </div>
              )}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                color: "white",
                fontSize: "1rem",
                padding: "1rem",
              }}
            >
              Nenhum evento lucrativo ainda
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Analytics;
