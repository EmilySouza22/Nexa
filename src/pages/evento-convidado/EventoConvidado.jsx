import { useState, useEffect } from "react";
import "./EventoConvidado.css";
import { icones } from "../../utils/iconEventoConvidado";

function EventoConvidado() {
  const [evento, setEvento] = useState(null);

  useEffect(() => {
    const fakeEvento = {
      nome: "Conecta Sul ",
      bannerUrl: "https://picsum.photos/800/400",
      data: "20/11/2025",
      hora: "14:00",
      descricao: "Um evento incrível para profissionais da área.",
      topicos: [
        "Networking com profissionais",
        "Palestras exclusivas",
        "Workshops práticos"
      ],
      classificacao: "+16",
      local: {
        nome: "Centro de Eventos Conecta",
        endereco: "Rua das Flores, 123 - Florianópolis"
      },
      organizadorFoto: "https://picsum.photos/200",
      organizadorLogo: "https://picsum.photos/150",
      organizadorNome: "Organização Conecta",
      organizadorDescricao: "Promovendo eventos educacionais e tecnológicos."
    };

    setTimeout(() => {
      setEvento(fakeEvento);
    }, 500);
  }, []);

  // 👇 ESSA LINHA ESTAVA FALTANDO!
  if (!evento) return <p>Carregando evento...</p>;

  return (
<div className="evento-container">
    
    {/* INFO PRINCIPAL */}
    <div className="evento-card">
      <img className="evento-banner" src={evento.bannerUrl} alt="banner" />

        <div className="evento-header">
        <h1>{evento.nome}</h1>

        <div className="evento-info-topo">
          <img src={icones.data} alt="data" />
          <p>{evento.data}</p>
        </div>

        <div className="evento-info-topo">
          <img src={icones.hora} alt="hora" />
          <p>{evento.hora}</p>
        </div>

        <div className="evento-info-topo">
          <img src={icones.local_cinza} alt="local" />
          <p>{evento.local.nome}</p>
        </div>

        <div className="evento-organizador">
          <button className="btn-ingresso">Comprar Ingresso</button>
        </div>

        </div>
    </div>

    
    <div className="box evento-detalhes-box">
      
      {/* DESCRIÇÃO */}
      <div className="secao-detalhes descricao">
            <div className="box-title">
            <img src={icones.descricao} alt="descricao" />
            <h3>Descrição</h3>
            </div>

            <p>{evento.descricao}</p>

            <ul>
            {evento.topicos?.map((item, index) => (
                <li key={index}>• {item}</li>
            ))}
            </ul>
        </div>

        {/* CLASSIFICAÇÃO */}
        <div className="secao-detalhes classificacao">
            <div className="box-title">
            <img src={icones.classificacao} alt="classificacao" />
            <h3>Classificação</h3>
            </div>
            <p>{evento.classificacao}</p>
        </div>

        {/* LOCAL */}
        <div className="secao-detalhes local">
            <div className="box-title">
            <img src={icones.local_paleta} alt="local" />
            <h3>Local do evento</h3>
            </div>

            <p>{evento.local.nome}</p>
            <p>{evento.local.endereco}</p>
        </div>

        </div>

        {/* ORGANIZADOR */}
        <div className="box organizador">
        <div className="box-title">
            <img src={icones.sobre_organizador} alt="organizador" />
            <h3>Sobre o Organizador</h3>
        </div>

        <div className="organizador-info">
            <img
            src={evento.organizadorLogo}
            className="logo-org"
            alt="logo organizador"
            />

            <div>
            <h4>{evento.organizadorNome}</h4>
            <p>{evento.organizadorDescricao}</p>

            <button className="btn-contato">
                <img src={icones.email} alt="email" />
                Falar com o organizador
            </button>

            <button className="btn-outros-eventos">
                <img src={icones.local_mais_evento} alt="mais eventos" />
                Mais eventos
            </button>
            </div>
        </div>
        </div>

</div>
);
}

export default EventoConvidado;
