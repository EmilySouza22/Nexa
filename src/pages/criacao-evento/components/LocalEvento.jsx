import React from 'react';
import './LocalEvento.css';

const LocalEvento = ({ formData, errors, onChange, buscandoCep, erroCep }) => {
  const estados = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
    "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
    "RS", "RO", "RR", "SC", "SP", "SE", "TO"
  ];

  return (
    <div className="box-04">
      <h2 className="titulo-style">4. Local do evento</h2>

      <div className="form-linha-local">
        <div className="coluna-local">
          <div className="campo-local">
            <label htmlFor="localEvento">Informe o local do evento*</label>
            <input
              id="localEvento"
              type="text"
              value={formData.localEvento}
              onChange={(e) => onChange('localEvento', e.target.value)}
              aria-invalid={!!errors.localEvento}
              aria-describedby={errors.localEvento ? "localEvento-error" : undefined}
            />
            {errors.localEvento && (
              <span id="localEvento-error" className="error-message">{errors.localEvento}</span>
            )}
          </div>

          <div className="campo-local">
            <label htmlFor="avenidaRua">Av./Rua*</label>
            <input
              id="avenidaRua"
              type="text"
              value={formData.avenidaRua}
              onChange={(e) => onChange('avenidaRua', e.target.value)}
              aria-invalid={!!errors.avenidaRua}
              aria-describedby={errors.avenidaRua ? "avenidaRua-error" : undefined}
            />
            {errors.avenidaRua && (
              <span id="avenidaRua-error" className="error-message">{errors.avenidaRua}</span>
            )}
          </div>

          <div className="campo-local">
            <label htmlFor="complemento">Complemento</label>
            <input
              id="complemento"
              type="text"
              value={formData.complemento}
              onChange={(e) => onChange('complemento', e.target.value)}
            />
          </div>

          <div className="campo-local">
            <label htmlFor="bairro">Bairro*</label>
            <input
              id="bairro"
              type="text"
              value={formData.bairro}
              onChange={(e) => onChange('bairro', e.target.value)}
              aria-invalid={!!errors.bairro}
              aria-describedby={errors.bairro ? "bairro-error" : undefined}
            />
            {errors.bairro && (
              <span id="bairro-error" className="error-message">{errors.bairro}</span>
            )}
          </div>
        </div>

        <div className="coluna-local">
          <div className="campo-local">
            <label htmlFor="estado">Estado*</label>
            <select
              id="estado"
              value={formData.estado}
              onChange={(e) => onChange('estado', e.target.value)}
              aria-invalid={!!errors.estado}
              aria-describedby={errors.estado ? "estado-error" : undefined}
            >
              <option value="">Selecione um estado</option>
              {estados.map(uf => (
                <option key={uf} value={uf}>{uf}</option>
              ))}
            </select>
            {errors.estado && (
              <span id="estado-error" className="error-message">{errors.estado}</span>
            )}
          </div>

          <div className="campo-local">
            <label htmlFor="cidade">Cidade*</label>
            <input
              id="cidade"
              type="text"
              value={formData.cidade}
              onChange={(e) => onChange('cidade', e.target.value)}
              aria-invalid={!!errors.cidade}
              aria-describedby={errors.cidade ? "cidade-error" : undefined}
            />
            {errors.cidade && (
              <span id="cidade-error" className="error-message">{errors.cidade}</span>
            )}
          </div>

          <div className="campo-local">
            <label htmlFor="cep">CEP</label>
            <input
              id="cep"
              type="text"
              value={formData.cep}
              onChange={(e) => onChange('cep', e.target.value)}
              placeholder="00000-000"
              maxLength="9"
              aria-invalid={!!errors.cep || !!erroCep}
              aria-describedby={errors.cep ? "cep-error" : undefined}
              disabled={buscandoCep}
            />
            {buscandoCep && (
              <span className="info-message">Buscando CEP...</span>
            )}
            {erroCep && (
              <span className="error-message">{erroCep}</span>
            )}
            {errors.cep && (
              <span id="cep-error" className="error-message">{errors.cep}</span>
            )}
          </div>

          <div className="campo-local">
            <label htmlFor="numero">Número</label>
            <input
              id="numero"
              type="text"
              value={formData.numero}
              onChange={(e) => onChange('numero', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalEvento;