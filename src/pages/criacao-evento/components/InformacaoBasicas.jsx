import "./InformacaoBasicas.css";

const InformacoesBasicas = ({
  formData,
  errors,
  onChange,
  onImageChange,
  onImageRemove,
}) => {
  const categorias = [
    { value: "1", label: "Festa" },
    { value: "2", label: "Teatros" },
    { value: "3", label: "Infantil" },
    { value: "4", label: "Shows" },
    { value: "5", label: "Stand Up" },
    { value: "6", label: "Esportivos" },
    { value: "7", label: "Workshops" },
    { value: "8", label: "Online" },
    { value: "9", label: "Gastronomia" },
  ];

  const classificacoes = [
    { value: "Livre", label: "Livre para Todos" },
    { value: "10+", label: "Acima de 10 anos" },
    { value: "12+", label: "Acima de 12 anos" },
    { value: "14+", label: "Acima de 14 anos" },
    { value: "16+", label: "Acima de 16 anos" },
    { value: "Maior de Idade", label: "Para Maiores de Idade" },
  ];

  return (
    <div className="box-01">
      <h2 className="titulo-style">Agora vamos detalhar esse evento!</h2>
      <p className="titulo2-style">1. Informações básicas</p>

      <div className="form-linha">
        <div className="campo-form">
          <label htmlFor="nameEvent" className="nome-evento">
            Nome do Evento*
          </label>
          <input
            id="nameEvent"
            type="text"
            value={formData.nameEvent}
            onChange={(e) => onChange("nameEvent", e.target.value)}
            placeholder="Digite o nome"
            aria-invalid={!!errors.nameEvent}
            aria-describedby={errors.nameEvent ? "nameEvent-error" : undefined}
          />
          {errors.nameEvent && (
            <span id="nameEvent-error" className="error-message">
              {errors.nameEvent}
            </span>
          )}
        </div>

        <div className="campo-form">
          <label htmlFor="category">Categoria*</label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => onChange("category", e.target.value)}
            aria-invalid={!!errors.category}
            aria-describedby={errors.category ? "category-error" : undefined}
          >
            <option value="">Selecione</option>
            {categorias.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.category && (
            <span id="category-error" className="error-message">
              {errors.category}
            </span>
          )}
        </div>
      </div>

      <div className="form-linha">
        <div className="campo-form">
          <label>Imagem de Divulgação*</label>
          <div
            className="upload-imagem"
            onClick={() => document.getElementById("fileInput").click()}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                document.getElementById("fileInput").click();
              }
            }}
            aria-label="Clique para adicionar imagem de divulgação"
          >
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={onImageChange}
              className="file-input-hidden"
              aria-describedby={errors.image ? "image-error" : undefined}
            />
            {formData.preview ? (
              <div className="container-preview">
                <img
                  src={formData.preview}
                  alt="Preview da imagem de divulgação"
                  className="preview-image"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onImageRemove();
                  }}
                  className="botao-remover"
                  type="button"
                  aria-label="Remover imagem"
                />
              </div>
            ) : (
              <div className="upload-placeholder">
                <div className="upload-placeholder-icon">📷</div>
                <p>Clique para adicionar imagem</p>
              </div>
            )}
          </div>
          {errors.image && (
            <span id="image-error" className="error-message">
              {errors.image}
            </span>
          )}
        </div>

        <div className="campo-form">
          <label htmlFor="classification" className="classificacao">
            Classificação indicativa*
          </label>
          <select
            id="classification"
            value={formData.classification}
            onChange={(e) => onChange("classification", e.target.value)}
            aria-invalid={!!errors.classification}
            aria-describedby={
              errors.classification ? "classification-error" : undefined
            }
          >
            <option value="">Selecione</option>
            {classificacoes.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.classification && (
            <span id="classification-error" className="error-message">
              {errors.classification}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default InformacoesBasicas;
