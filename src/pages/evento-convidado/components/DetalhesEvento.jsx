import { icones } from "../../../utils/iconEventoConvidado";
import "./DetalhesEvento.css";

function DetalhesEvento({ evento }) {
  return (
    <div className="detalhes-evento-container">
      {/* DESCRIÇÃO */}
      <div className="secao-detalhes descricao">
        <div className="detalhes-title">
          <img src={icones.descricao} alt="descrição" />
          <h3>Descrição</h3>
        </div>
        <div className="detalhes-content">
          <p>{evento.descricao}</p>
          
          {evento.descricaoCompleta && (
            <p className="descricao-adicional">{evento.descricaoCompleta}</p>
          )}

          {evento.dataEvento && (
            <p className="data-destaque">
              <strong>Data:</strong> {evento.dataEvento}
            </p>
          )}

          {evento.topicos && evento.topicos.length > 0 && (
            <>
              <p className="topico-titulo">{evento.tituloTopicos}</p>
              <ul className="lista-topicos">
                {evento.topicos.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </>
          )}

          {evento.detalhesAdicionais && evento.detalhesAdicionais.length > 0 && (
            <ul className="lista-detalhes">
              {evento.detalhesAdicionais.map((detalhe, index) => (
                <li key={index}>
                  <strong>{detalhe.titulo}</strong>
                  {detalhe.itens && (
                    <ul className="sublista">
                      {detalhe.itens.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}

          {evento.premios && (
            <p className="premio-destaque">
              <strong>{evento.premios.titulo}</strong><br />
              {evento.premios.descricao}
            </p>
          )}
        </div>
      </div>

      {/* CLASSIFICAÇÃO */}
      <div className="secao-detalhes classificacao">
        <div className="detalhes-title">
          <img src={icones.classificacao} alt="classificação" />
          <h3>Classificação</h3>
        </div>
        <div className="detalhes-content">
          <p className="classificacao-valor">{evento.classificacao}</p>
        </div>
      </div>

      {/* LOCAL DO EVENTO */}
      <div className="secao-detalhes local">
        <div className="detalhes-title">
          <img src={icones.local_paleta} alt="local" />
          <h3>Local do evento</h3>
        </div>
        <div className="detalhes-content">
          <p className="local-nome">{evento.local.nome}</p>
          <p className="local-endereco">{evento.local.endereco}</p>
        </div>
      </div>
    </div>
  );
}

export default DetalhesEvento;