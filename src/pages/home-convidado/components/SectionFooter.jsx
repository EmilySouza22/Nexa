import React from 'react'
import "./SectionFooter.css"

function SectionFooter() {
  return (
    <div className='HomeConv-Footer'>
        <div className='HomeConv-MarcaSite'>

        </div>
        <div className='HomeConv-RedesSociais'>
            <div>
                <img src="" alt="Linkedin" />
                <img src="" alt="Instagram" /> {/*Mudar a logo pra preenchida tambem */}
                <img src="" alt="Facebook" />
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