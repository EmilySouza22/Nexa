const DataHorario = ({ formData, errors, onChange }) => (
  <div style={{ backgroundColor: '#fff', padding: '30px', marginBottom: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
    <h2 style={{ fontSize: '20px', marginBottom: '8px' }}>2. Data e horário</h2>
    <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>Informe quando seu evento irá acontecer</p>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
      <div>
        <label htmlFor="dateInicio" style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
          Data de início*
        </label>
        <input
          id="dateInicio"
          type="date"
          value={formData.dateInicio}
          onChange={(e) => onChange('dateInicio', e.target.value)}
          style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
        />
        <ErrorMessage id="dateInicio-error" message={errors.dateInicio} />
      </div>

      <div>
        <label htmlFor="timeInicio" style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
          Hora de início*
        </label>
        <input
          id="timeInicio"
          type="time"
          value={formData.timeInicio}
          onChange={(e) => onChange('timeInicio', e.target.value)}
          style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
        />
        <ErrorMessage id="timeInicio-error" message={errors.timeInicio} />
      </div>

      <div>
        <label htmlFor="dateTermino" style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
          Data de término*
        </label>
        <input
          id="dateTermino"
          type="date"
          value={formData.dateTermino}
          onChange={(e) => onChange('dateTermino', e.target.value)}
          style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
        />
        <ErrorMessage id="dateTermino-error" message={errors.dateTermino} />
      </div>

      <div>
        <label htmlFor="timeTermino" style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
          Hora de término*
        </label>
        <input
          id="timeTermino"
          type="time"
          value={formData.timeTermino}
          onChange={(e) => onChange('timeTermino', e.target.value)}
          style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
        />
        <ErrorMessage id="timeTermino-error" message={errors.timeTermino} />
      </div>
    </div>
  </div>
);