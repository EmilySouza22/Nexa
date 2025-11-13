import React from 'react'
import "./SectionMuralEvento.css"
import { iconsHomeConv } from "../../../utils/iconsHomeConv.js";

function SectionMuralEvento() {
  return (
    <div className='HomeConv-MuralEvento'>
        <div className='HomeConv-Carrossel'></div>
        <div className='HomeConv-Paginacao'></div>
        <h3>7º Fórum de Inteligência e Compras Estratégicas do Sul do Brasil</h3>
        <div className='HomeConv-InfoEvento'>
            <div className='HomeConv-InfoLocal'>
              <img src={iconsHomeConv.localIcon} alt="" />
              <div>Curitiba - PR</div>
            </div>
            <div className='HomeConv-InfoData'>
              <img src={iconsHomeConv.calendarioIcon} alt="" />
              <div>Quinta, 18 de Dez às 21:00</div>
            </div>
        </div>
    </div>
  )
}

export default SectionMuralEvento