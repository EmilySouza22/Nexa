import React from 'react';
import './DataHorario.css'

const DataHorario = ({ formData, errors, onChange }) => (
  <div className="box-02">
    <h2 className="titulo-style">2. Data e horário</h2>
    <p>Informe quando seu evento irá acontecer</p>

    <div className="form-linha-datas">
      <div className="campo">
        <label htmlFor="dateInicio">Data de início*</label>
        <div className="input-simples">
          <div className="icon-area" onClick={() => document.getElementById('dateInicio').showPicker()}>
            <img src="/assets/criacao-evento/icon-data.svg" alt="" />
          </div>
          <input
            id="dateInicio"
            type="date"
            value={formData.dateInicio}
            onChange={(e) => onChange('dateInicio', e.target.value)}
            aria-invalid={!!errors.dateInicio}
            aria-describedby={errors.dateInicio ? "dateInicio-error" : undefined}
          />
        </div>
        {errors.dateInicio && (
          <span id="dateInicio-error" className="error-message">{errors.dateInicio}</span>
        )}
      </div>

      <div className="campo">
        <label htmlFor="timeInicio">Hora de início*</label>
        <div className="input-simples">
          <div className="icon-area" onClick={() => document.getElementById('timeInicio').showPicker()}>
            <img src="/assets/criacao-evento/icon-hora.svg" alt="" />
          </div>
          <input
            id="timeInicio"
            type="time"
            value={formData.timeInicio}
            onChange={(e) => onChange('timeInicio', e.target.value)}
            aria-invalid={!!errors.timeInicio}
            aria-describedby={errors.timeInicio ? "timeInicio-error" : undefined}
          />
        </div>
        {errors.timeInicio && (
          <span id="timeInicio-error" className="error-message">{errors.timeInicio}</span>
        )}
      </div>

      <div className="campo">
        <label htmlFor="dateTermino">Data de término*</label>
        <div className="input-simples">
          <div className="icon-area" onClick={() => document.getElementById('dateTermino').showPicker()}>
            <img src="/assets/criacao-evento/icon-data.svg" alt="" />
          </div>
          <input
            id="dateTermino"
            type="date"
            value={formData.dateTermino}
            onChange={(e) => onChange('dateTermino', e.target.value)}
            aria-invalid={!!errors.dateTermino}
            aria-describedby={errors.dateTermino ? "dateTermino-error" : undefined}
          />
        </div>
        {errors.dateTermino && (
          <span id="dateTermino-error" className="error-message">{errors.dateTermino}</span>
        )}
      </div>

      <div className="campo">
        <label htmlFor="timeTermino">Hora de término*</label>
        <div className="input-simples">
          <div className="icon-area" onClick={() => document.getElementById('timeTermino').showPicker()}>
            <img src="/assets/criacao-evento/icon-hora.svg" alt="" />
          </div>
          <input
            id="timeTermino"
            type="time"
            value={formData.timeTermino}
            onChange={(e) => onChange('timeTermino', e.target.value)}
            aria-invalid={!!errors.timeTermino}
            aria-describedby={errors.timeTermino ? "timeTermino-error" : undefined}
          />
        </div>
        {errors.timeTermino && (
          <span id="timeTermino-error" className="error-message">{errors.timeTermino}</span>
        )}
      </div>
    </div>
  </div>
);

export default DataHorario;
