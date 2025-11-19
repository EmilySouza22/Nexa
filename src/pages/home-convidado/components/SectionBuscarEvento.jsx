import React from 'react';
import "./SectionBuscarEvento.css";
import { iconsHomeConv } from "../../../utils/iconsHomeConv.js";

function SectionBuscarEvento() {
  return (
    <div className='HomeConv-BuscarEvento'>
        <div className='HomeConv-ContainerTop'>
            <div className='HomeConv-ContainerPesquisa'>
                <p className='HomeConvTitle1'>Procure sua próxima experiência</p>
                <div className='HomeConv-PesquisaEvento'>
                    <img src={iconsHomeConv.lupaIcon} alt="Lupa" className='HomeConv-IconLupa'/>
                    <p className='HomeConv-TextSearch'>Buscar evento</p>
                </div>
            </div>
            <div className='HomeConv-ContainerProximoEvento'>
                {/* Só vai ter esse container se o convidado possuir um ingresso para um evento */}
                <p>Próximo evento acontecerá em:</p>
                <div className='HomeConv-ContainerTempo'>
                    <img src={iconsHomeConv.horaIcon} alt="Relógio" />
                    2d 16h
                </div>
            </div>
        </div>
        <div className='HomeConv-ContainerCategoria'>
            <p>Categorias</p>
            <div className='HomeConv-ContainerCategorias'>
                <div>
                    <img src={iconsHomeConv.musicIcon} alt="Icon-Nota-Musical" />
                    <p>Festas</p>
                </div>
                <div>
                    <img src={iconsHomeConv.mascaraIcon} alt="Icon-Mascara" />
                    <p>Teatros</p>
                </div>
                <div>
                    <img src={iconsHomeConv.infantilIcon} alt="Icon-Bebê" />
                    <p>Infantil</p>
                </div>
                <div>
                    <img src={iconsHomeConv.discoIcon} alt="Icon-Disco" />
                    <p>Shows</p>
                </div>
                <div>
                    <img src={iconsHomeConv.microfoneIcon} alt="Icon-Microfone" />
                    <p>Stand Up</p>
                </div>
                <div>
                    <img src={iconsHomeConv.esportesIcon} alt="Icon-PessoaJogando" />
                    <p>Esportivos</p>
                </div>
                <div>
                    <img src={iconsHomeConv.certificadoIcon} alt="Icon-Certificado" />
                    <p>Workshops</p>
                </div>
                <div>
                    <img src={iconsHomeConv.reuniaoIcon} alt="Icon-Reuniao-Online" />
                    <p>Online</p>
                </div>
                <div>
                    <img src={iconsHomeConv.gastronomiaIcon} alt="Icon-Garfo-Faca" />
                    <p>Gastronomia</p>
                </div>
            </div>
        </div>
        <div className='HomeConv-CarrosselEventos'>
            <div className='HomeConv-EventosParaHoje'></div>
            <div className='HomeConv-EventosEmAltaRegiao'></div>
        </div>
    </div>
  )
}

export default SectionBuscarEvento