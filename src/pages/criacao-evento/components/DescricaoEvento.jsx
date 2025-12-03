const DescricaoEvento = ({ descricao, onChange, error }) => (
  <div style={{ backgroundColor: '#fff', padding: '30px', marginBottom: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
    <h2 style={{ fontSize: '20px', marginBottom: '8px' }}>3. Descrição do evento</h2>
    <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>Conte todos os detalhes do seu evento</p>

    <textarea
      id="descricao"
      value={descricao}
      onChange={onChange}
      placeholder="Digite a descrição do evento..."
      rows={8}
      style={{ 
        width: '100%', 
        padding: '12px', 
        fontSize: '14px',
        border: '1px solid #ddd',
        borderRadius: '6px',
        resize: 'vertical'
      }}
    />
    <div style={{ textAlign: 'right', fontSize: '12px', color: '#666', marginTop: '8px' }}>
      {descricao.length} caracteres
    </div>
    <ErrorMessage id="descricao-error" message={error} />
  </div>
);