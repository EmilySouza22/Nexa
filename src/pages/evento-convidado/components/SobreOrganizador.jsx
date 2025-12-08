import { icones } from "../../../utils/iconEventoConvidado";
import { useNavigate } from "react-router-dom";
import "./SobreOrganizador.css";

function SobreOrganizador({ evento }) {
  const navigate = useNavigate();

  if (!evento) {
    return <div>Carregando informações do organizador...</div>;
  }

  const handleFalarOrganizador = () => {
    if (evento.organizadorEmail) {
      // Abre o cliente de email padrão
      window.location.href = `mailto:${evento.organizadorEmail}?subject=Contato sobre o evento: ${evento.nome}`;
    } else {
      alert('Email do organizador não disponível');
    }
  };

  const handleMaisEventos = () => {
    // Redirecionar para página de eventos do organizador
    if (evento.organizadorId) {
      // Você pode criar uma página de listagem depois
      navigate(`/eventos/organizador/${evento.organizadorId}`);
    } else {
      alert('Não foi possível encontrar outros eventos deste organizador');
    }
  };

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
            src={evento.organizadorLogo || "https://via.placeholder.com/150/6366f1/ffffff?text=ORG"}
            alt="logo organizador"
            className="organizador-logo"
            onError={(e) => {
              // Se a imagem falhar, usa placeholder
              e.target.src = "https://via.placeholder.com/150/6366f1/ffffff?text=ORG";
            }}
          />
        </div>

        <div className="organizador-info">
          <h4 className="organizador-nome">
            {evento.organizadorNome || "Organizador não informado"}
          </h4>
          <p className="organizador-descricao">
            {evento.organizadorDescricao || "Sem descrição disponível"}
          </p>

          <div className="organizador-acoes">
            <button 
              className="btn-organizador btn-falar"
              onClick={handleFalarOrganizador}
              disabled={!evento.organizadorEmail}
              style={{
                opacity: evento.organizadorEmail ? 1 : 0.5,
                cursor: evento.organizadorEmail ? 'pointer' : 'not-allowed'
              }}
            >
              <img src={icones.email} alt="email" />
              Falar com o organizador
            </button>

            <button 
              className="btn-organizador btn-mais-eventos"
              onClick={handleMaisEventos}
              disabled={!evento.organizadorId}
              style={{
                opacity: evento.organizadorId ? 1 : 0.5,
                cursor: evento.organizadorId ? 'pointer' : 'not-allowed'
              }}
            >
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