const InformacoesBasicas = ({ formData, errors, onChange, onImageChange, onImageRemove }) => {
  const categorias = [
    { value: 'opcao1', label: 'Festa' },
    { value: 'opcao2', label: 'Teatros' },
    { value: 'opcao3', label: 'Infantil' },
    { value: 'opcao4', label: 'Shows' },
    { value: 'opcao5', label: 'Stand Up' },
    { value: 'opcao6', label: 'Esportivos' },
    { value: 'opcao7', label: 'Workshops' },
    { value: 'opcao8', label: 'Online' },
    { value: 'opcao9', label: 'Gastronomia' },
  ];

  const classificacoes = [
    { value: 'Livre', label: 'Livre para Todos' },
    { value: '10+', label: 'Acima de 10 anos' },
    { value: '12+', label: 'Acima de 12 anos' },
    { value: '14+', label: 'Acima de 14 anos' },
    { value: '16+', label: 'Acima de 16 anos' },
    { value: 'Maior de Idade', label: 'Para Maiores de Idade' },
  ];

  return (
    <div style={{ backgroundColor: '#fff', padding: '30px', marginBottom: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <h2 style={{ fontSize: '20px', marginBottom: '8px' }}>Agora vamos detalhar esse evento!</h2>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>1. Informações básicas</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <div>
          <label htmlFor="nameEvent" style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
            Nome do Evento*
          </label>
          <input
            id="nameEvent"
            type="text"
            value={formData.nameEvent}
            onChange={(e) => onChange('nameEvent', e.target.value)}
            placeholder="Digite o nome"
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
          />
          <ErrorMessage id="nameEvent-error" message={errors.nameEvent} />
        </div>

        <div>
          <label htmlFor="category" style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
            Categoria*
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => onChange('category', e.target.value)}
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
          >
            <option value="">Selecione</option>
            {categorias.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <ErrorMessage id="category-error" message={errors.category} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Imagem de Divulgação*</label>
          <div
            onClick={() => document.getElementById('fileInput').click()}
            style={{ 
              cursor: 'pointer', 
              border: '2px dashed #ddd', 
              padding: '40px', 
              textAlign: 'center',
              borderRadius: '6px',
              backgroundColor: '#fafafa'
            }}
          >
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={onImageChange}
              style={{ display: 'none' }}
            />
            {formData.preview ? (
              <div style={{ position: 'relative' }}>
                <img src={formData.preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '6px' }} />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onImageRemove();
                  }}
                  style={{ 
                    position: 'absolute', 
                    top: '5px', 
                    right: '5px',
                    background: '#fff',
                    border: 'none',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    cursor: 'pointer'
                  }}
                  type="button"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: '40px', marginBottom: '10px' }}>📷</div>
                <p style={{ color: '#999', fontSize: '14px' }}>Clique para adicionar imagem</p>
              </div>
            )}
          </div>
          <ErrorMessage id="image-error" message={errors.image} />
        </div>

        <div>
          <label htmlFor="classification" style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
            Classificação indicativa*
          </label>
          <select
            id="classification"
            value={formData.classification}
            onChange={(e) => onChange('classification', e.target.value)}
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
          >
            <option value="">Selecione</option>
            {classificacoes.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <ErrorMessage id="classification-error" message={errors.classification} />
        </div>
      </div>
    </div>
  );
};