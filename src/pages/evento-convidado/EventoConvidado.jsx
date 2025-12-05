import { useState, useEffect } from "react";
import "./EventoConvidado.css";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import CardEventoOgz from "./components/CardEventoOgz";
import DetalhesEvento from "./components/DetalhesEvento";
import SobreOrganizador from "./components/SobreOrganizador";

function EventoConvidado() {
  const [evento, setEvento] = useState(null);

  useEffect(() => {
    // Dados mockados - depois virá do backend
    const fakeEvento = {
      nome: "Conecta Sul",
      bannerUrl: "https://picsum.photos/800/400",
      data: "23 de Outubro à 27 de Outubro",
      hora: "Quinta, Sexta às 20h00, Sábado às 16h00, Domingo às 15h00",
      local: {
        nome: "Teatro Santander",
        endereco: "Avenida Presidente Juscelino Kubitschek, 2041, São Paulo - SP"
      },
      descricao: "O Deep Tech Summit 2025 é o principal evento da América Latina dedicado à inovação baseada em ciência e engenharia de fronteira. Durante dois dias, reunimos as startups mais promissoras, os investidores globais e grandes corporações para discutir e construir o futuro por meio de deep techs.",
      descricaoCompleta: "Com trilhas de conteúdo curadas, experiências de matchmaking, reconhecimento das startups mais ousadas da região e um ambiente pensado para conexões reais, o evento é a plataforma ideal para quem está na vanguarda da inovação tecnológica.",
      dataEvento: "23 a 27 de outubro de 2025",
      tituloTopicos: "Por que participar do Deep Tech Summit?",
      topicos: [
        "Foco Exclusivo em Deep Techs: Evento 100% voltado para inovação baseada em ciência.",
        "Ecossistema Global em Conexão: Startups, corporações, fundos de investimento e +2000 participantes conectando ciência ao mercado.",
        "Conteúdo Curado com Profundidade: Três palcos com trilhas complementares para fundadores, investidores, pesquisadores e executivos.",
        "Matchmaking de Verdade: Aplicativo oficial, agenda de reuniões e encontros direcionados para fechar parcerias e negócios.",
        "Prêmio Deep Tech do Ano: Reconhecimento das deep techs mais ousadas, com pitch ao vivo e banca de especialistas."
      ],
      classificacao: "Aberto para todos os idades",
      organizadorNome: "Confederação Nacional do Comércio de Bens, Serviços e Turismo (CNC)",
      organizadorDescricao: "A Confederação Nacional do Comércio de Bens, Serviços e Turismo é uma entidade sindical que representa os direitos e interesses dos quase cinco milhões de empreendedores do comércio brasileiro.",
      organizadorLogo: "https://picsum.photos/150"
    };

    setTimeout(() => {
      setEvento(fakeEvento);
    }, 500);
  }, []);

  const userName = "Organizadora Emily";
  const userInitials = "EA";

  if (!evento) {
    return (
      <div className="home-organizador">
        <Navbar userName={userName} userInitials={userInitials} />
        <div className="home-organizador-layout">
          <Sidebar userType="organizador" />
          <main>
            <p>Carregando evento...</p>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="home-organizador">
      <Navbar userName={userName} userInitials={userInitials} />
      <div className="home-organizador-layout">
        <Sidebar userType="organizador" />
        <main>
          <CardEventoOgz evento={evento} />
          <DetalhesEvento evento={evento} />
          <SobreOrganizador evento={evento} />
        </main>
      </div>
    </div>
  );
}

export default EventoConvidado;