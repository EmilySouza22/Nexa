const LocalEvento = ({ formData, errors, onChange }) => {
  const estados = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
    "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
    "RS", "RO", "RR", "SC", "SP", "SE", "TO"
  ];

  return (
    <div style={{ backgroundColor: '#fff', padding: '30px', marginBottom: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <h2 style={{ fontSize: '20px', marginBottom: '24px' }}>4. Local do evento</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label htmlFor="localEvento" style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
              Informe o local do evento*
            </label>
            <input
              id="localEvento"
              type="text"
              value={formData.localEvento}
              onChange={(e) => onChange('localEvento', e.target.value)}
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
            />
            <ErrorMessage id="localEvento-error" message={errors.localEvento} />
          </div>

          <div>
            <label htmlFor="avenidaRua" style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
              Av./Rua*
            </label>
            <input
              id="avenidaRua"
              type="text"
              value={formData.avenidaRua}
              onChange={(e) => onChange('avenidaRua', e.target.value)}
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
            />
            <ErrorMessage id="avenidaRua-error" message={errors.avenidaRua} />
          </div>

          <div>
            <label htmlFor="complemento" style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
              Complemento
            </label>
            <input
              id="complemento"
              type="text"
              value={formData.complemento}
              onChange={(e) => onChange('complemento', e.target.value)}
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
            />
          </div>

          <div>
            <label htmlFor="bairro" style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
              Bairro*
            </label>
            <input
              id="bairro"
              type="text"
              value={formData.bairro}
              onChange={(e) => onChange('bairro', e.target.value)}
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
            />
            <ErrorMessage id="bairro-error" message={errors.bairro} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label htmlFor="estado" style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
              Estado*
            </label>
            <select
              id="estado"
              value={formData.estado}
              onChange={(e) => onChange('estado', e.target.value)}
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
            >
              <option value="">Selecione um estado</option>
              {estados.map(uf => (
                <option key={uf} value={uf}>{uf}</option>
              ))}
            </select>
            <ErrorMessage id="estado-error" message={errors.estado} />
          </div>

          <div>
            <label htmlFor="cidade" style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
              Cidade*
            </label>
            <input
              id="cidade"
              type="text"
              value={formData.cidade}
              onChange={(e) => onChange('cidade', e.target.value)}
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
            />
            <ErrorMessage id="cidade-error" message={errors.cidade} />
          </div>

          <div>
            <label htmlFor="cep" style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
              CEP
            </label>
            <input
              id="cep"
              type="text"
              value={formData.cep}
              onChange={(e) => onChange('cep', e.target.value)}
              placeholder="00000-000"
              maxLength="9"
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
            />
            <ErrorMessage id="cep-error" message={errors.cep} />
          </div>

          <div>
            <label htmlFor="numero" style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
              Número
            </label>
            <input
              id="numero"
              type="text"
              value={formData.numero}
              onChange={(e) => onChange('numero', e.target.value)}
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};