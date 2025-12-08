import React from 'react';
import './BotaoEdicao.css';
import { iconsCE } from "../../../utils/icons";

const BotaoEdicao = ({ isSubmitting, onSubmit }) => (
  <div className="box-08">
    <button
      type="button"
      className="btn-publicar-evento"
      onClick={onSubmit}
      disabled={isSubmitting}
      aria-label={isSubmitting ? "Salvando alterações..." : "Salvar alterações"}
    >
      <img src={iconsCE.publicar} alt="Salvar" style={{ marginRight: '8px' }} />
      <span className="btn-text">
        {isSubmitting ? 'Salvando...' : 'Salvar alterações'}
      </span>
    </button>
  </div>
);

export default BotaoEdicao;