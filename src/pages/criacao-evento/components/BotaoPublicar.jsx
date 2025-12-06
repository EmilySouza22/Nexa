import React from 'react';
import './BotaoPublicar.css';
import { iconsCE } from '../../../utils/iconsCriacaoEvento'

const BotaoPublicar = ({ isSubmitting, onSubmit }) => (
  <div className="box-08">
    <button
      type="button"
      className="btn-publicar-evento"
      onClick={onSubmit}
      disabled={isSubmitting}
      aria-label={isSubmitting ? "Publicando evento..." : "Publicar evento"}
    >
      <img src={iconsCE.publicar} alt="Publicar" style={{ marginRight: '8px' }} />
      <span className="btn-text">
        {isSubmitting ? 'Publicando...' : 'Publicar evento'}
      </span>
    </button>
  </div>
);

export default BotaoPublicar;