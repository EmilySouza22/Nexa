import React from 'react';
import './Responsabilidades.css';

const Responsabilidades = ({ aceitaTermos, onChange, error }) => (
  <div className="box-07">
    <h2 className="titulo-style">6. Responsabilidades</h2>

    <div className="responsabilidades-container">
      <label className="checkbox-wrapper">
        <input
          id="aceitaTermos"
          type="checkbox"
          checked={aceitaTermos}
          onChange={onChange}
          className="checkbox-input"
          aria-invalid={!!error}
          aria-describedby={error ? "aceitaTermos-error" : undefined}
        />
        <div className={`checkbox-custom ${aceitaTermos ? 'checked' : ''}`}>
          {aceitaTermos && (
            <svg
              className="checkbox-icon"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path d="M5 13l4 4L19 7"></path>
            </svg>
          )}
        </div>
      </label>

      <p className="responsabilidades-texto">
        Ao publicar este evento, estou de acordo com os Termos de uso, com as Diretrizes de Comunidade 
        e com as Regras de meia-entrada, bem como declaro estar ciente da Política de Privacidade e das 
        Obrigatoriedades Legais.
      </p>
    </div>
    {error && (
      <span id="aceitaTermos-error" className="error-message">{error}</span>
    )}
  </div>
);

export default Responsabilidades;