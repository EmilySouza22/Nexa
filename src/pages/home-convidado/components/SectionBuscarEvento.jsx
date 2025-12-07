import React from 'react';
import "./SectionBuscarEvento.css";
import { iconsHomeConv } from "../../../utils/iconsHomeConv.js";
import BarraPesquisa from './BarraPesquisa.jsx';
import ProximoEvento from './ProximoEvento.jsx';
import { EventsCarousel } from './EventsCarousel.jsx';

function SectionBuscarEvento() {
  return (
    <div className='HomeConv-BuscarEvento'>
        <div className='HomeConv-ContainerTop'>
            <div className='HomeConv-ContainerPesquisa'>
                <p className='HomeConvTitle1'>Procure sua próxima experiência</p>
                <BarraPesquisa/>
            </div>
            <ProximoEvento/>  
        </div>
        <div className='HomeConv-ContainerCategoria'>
            <p className='HomeConv-TitleCategoria'>Categorias</p>
            <div className='HomeConv-ContainerCategorias'>
                <div className='HomeConv-ContainerBotãoCategoria'>
                    <div className='HomeConv-BotaoCategoria'>
                        <img src={iconsHomeConv.musicIcon} alt="Icon-Nota-Musical" />
                    </div>
                    <div>
                        <p className='HomeConv-NomeCategoriaFiltro'>Festas</p>
                    </div>
                </div>

                <div className='HomeConv-ContainerBotãoCategoria'>
                    <div className='HomeConv-BotaoCategoria'>
                        <img src={iconsHomeConv.mascaraIcon} alt="Icon-Mascara" />
                    </div>
                    <div>
                        <p className='HomeConv-NomeCategoriaFiltro'>Teatros</p>
                    </div>
                </div>

                <div className='HomeConv-ContainerBotãoCategoria'>
                    <div className='HomeConv-BotaoCategoria'>
                        <img src={iconsHomeConv.infantilIcon} alt="Icon-Bebê" />
                    </div>
                    <div>
                        <p className='HomeConv-NomeCategoriaFiltro'>Infantil</p>
                    </div>
                </div>

                <div className='HomeConv-ContainerBotãoCategoria'>
                    <div className='HomeConv-BotaoCategoria'>
                        <img src={iconsHomeConv.discoIcon} alt="Icon-Disco" />
                    </div>
                    <div>
                        <p className='HomeConv-NomeCategoriaFiltro'>Shows</p>
                    </div>
                </div>

                <div className='HomeConv-ContainerBotãoCategoria'>
                    <div className='HomeConv-BotaoCategoria'>
                        <img src={iconsHomeConv.microfoneIcon} alt="Icon-Microfone" />
                    </div>
                    <div>
                        <p className='HomeConv-NomeCategoriaFiltro'>Stand Up</p>
                    </div>
                </div>

                <div className='HomeConv-ContainerBotãoCategoria'>
                    <div className='HomeConv-BotaoCategoria'>
                        <img src={iconsHomeConv.esportesIcon} alt="Icon-PessoaJogando" />
                    </div>
                    <div>
                        <p className='HomeConv-NomeCategoriaFiltro'>Esportivos</p>
                    </div>
                </div>

                <div className='HomeConv-ContainerBotãoCategoria'>
                    <div className='HomeConv-BotaoCategoria'>
                        <img src={iconsHomeConv.certificadoIcon} alt="Icon-Certificado" />
                    </div>
                    <div>
                        <p className='HomeConv-NomeCategoriaFiltro'>Workshops</p>
                    </div>
                </div>

                <div className='HomeConv-ContainerBotãoCategoria'>
                    <div className='HomeConv-BotaoCategoria'>
                        <img src={iconsHomeConv.reuniaoIcon} alt="Icon-Reuniao-Online" />
                    </div>
                    <div>
                        <p className='HomeConv-NomeCategoriaFiltro'>Online</p>
                    </div>
                </div>

                <div className='HomeConv-ContainerBotãoCategoria'>
                    <div className='HomeConv-BotaoCategoria'>
                        <img src={iconsHomeConv.gastronomiaIcon} alt="Icon-Garfo-Faca" />
                    </div>
                    <div>
                        <p className='HomeConv-NomeCategoriaFiltro'>Gastronomia</p>
                    </div>
                </div>

            </div>
        </div>
        <div className='HomeConv-CarrosselEventos'>
            <EventsCarousel/>
        </div>
    </div>
  )
}

export default SectionBuscarEvento