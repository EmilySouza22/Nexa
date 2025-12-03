import React from 'react';
import './DescricaoEvento.css';

const DescricaoEvento = ({ descricao, onChange, error }) => (
  <div className="box-03">
    <h2 className="titulo-style">3. Descrição do evento</h2>
    <p>Conte todos os detalhes do seu evento</p>

    <div className="campo-descricao">
      <textarea
        id="descricao"
        value={descricao}
        onChange={onChange}
        placeholder="Digite a descrição do evento..."
        className="textarea-descricao"
        rows={8}
        aria-invalid={!!error}
        aria-describedby={error ? "descricao-error" : undefined}
      />
    </div>

    <div className="contador-caracteres">
      <span>{descricao.length} caracteres</span>
    </div>
    {error && (
      <span id="descricao-error" className="error-message">{error}</span>
    )}
  </div>
);

export default DescricaoEvento;