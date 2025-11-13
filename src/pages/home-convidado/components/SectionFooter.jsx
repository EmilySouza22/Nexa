import React from 'react'
import "./SectionFooter.css"
import { iconsHomeConv } from "../../../utils/iconsHomeConv.js";

function SectionFooter() {
  return (
    <div className='HomeConv-Footer'>
        <div className='HomeConv-MarcaSite'></div>
        <div className='HomeConv-RedesSociais'>
            <div>
                <img src={iconsHomeConv.linkedinIcon} alt="Linkedin" />
                <img src={iconsHomeConv.instagramIcon} alt="Instagram" /> {/*Mudar a logo pra preenchida tambem */}
                <img src={iconsHomeConv.facebookIcon} alt="Facebook" />
                {/* Fazer aqui o travessao */}
            </div>
            <div>
                <p>Copyright 2025 © Nexa </p>
            </div>
        </div>
    </div>
  )
}

export default SectionFooter