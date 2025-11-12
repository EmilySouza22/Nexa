import React from 'react'
import "./SectionBuscarEvento.css"

function SectionBuscarEvento() {
  return (
    <div className='HomeConv-BuscarEvento'>
        <div className='HomeConv-ContainerTop'>
            <div className='HomeConv-ContainerPesquisa'>
                <p>Procure sua próxima experiência</p>
                <div>
                    <img src="" alt="Lupa" />
                    Buscar evento
                </div>
            </div>
            <div className='HomeConv-ContainerProximoEvento'>
                {/* Só vai ter esse container se o convidado possuir um ingresso para um evento */}
                <p>Próximo evento acontecerá em:</p>
                <div className='HomeConv-ContainerTempo'>
                    <img src="" alt="Relógio" />
                    2d 16h
                </div>
            </div>
        </div>
        <div className='HomeConv-ContainerCategoria'>
            <p>Categorias</p>
            <div className='HomeConv-ContainerCategorias'>
                <div>
                    <img src="" alt="Icon-Nota-Musical" />
                    <p>Festas</p>
                </div>
                <div>
                    <img src="" alt="Icon-Máscara" />
                    <p>Teatros</p>
                </div>
                <div>
                    <img src="" alt="Icon-Bebê" />
                    <p>Infantil</p>
                </div>
                <div>
                    <img src="" alt="Icon-Disco" />
                    <p>Shows</p>
                </div>
                <div>
                    <img src="" alt="Icon-Microfone" />
                    <p>Stand Up</p>
                </div>
                <div>
                    <img src="" alt="Icon-PessoaJogando" />
                    <p>Esportivos</p>
                </div>
                <div>
                    <img src="" alt="Icon-Certificado" />
                    <p>Workshops</p>
                </div>
                <div>
                    <img src="" alt="Icon-Reuniao-Online" />
                    <p>Online</p>
                </div>
                <div>
                    <img src="" alt="Icon-Garfo-Faca" />
                    <p>Gastronomia</p>
                </div>
            </div>
        </div>
        <div className='HomeConv-CarrosselEventos'>
            <div className='HomeConv-EventosParaHoje'>

            </div>
            <div className='HomeConv-EventosEmAltaRegiao'>

            </div>
        </div>
    </div>
  )
}

export default SectionBuscarEvento