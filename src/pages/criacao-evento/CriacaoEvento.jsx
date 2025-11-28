import React, { useState } from 'react';
import './CriacaoEvento.css';
import './CriacaoEventoBoxes.css';

function CriacaoEvento() {
  const [nameEvent, setEventName] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [classification, setClassification] = useState('');
  const [dateInicio, setDateInicio] = useState("");
  const [timeInicio, setTimeInicio] = useState("");
  const [dateTermino, setDateTermino] = useState("");
  const [timeTermino, setTimeTermino] = useState("");
  const [descricao, setDescricao] = useState('');
  const [localEvento, setLocalEvento] = useState('');
  const [estado, setEstado] = useState('');
  const [avenidaRua, setAvenidaRua] = useState('');
  const [cidade, setCidade] = useState('');
  const [complemento, setComplemento] = useState('');
  const [cep, setCep] = useState('');
  const [bairro, setBairro] = useState('');
  const [numero, setNumero] = useState('');
  const [aceitaTermos, setAceitaTermos] = useState(false);
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Validar tipo de arquivo
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, image: 'Por favor, selecione apenas arquivos de imagem' }));
        return;
      }

      // Validar tamanho (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'A imagem deve ter no máximo 5MB' }));
        return;
      }

      setImage(file);
      setErrors(prev => ({ ...prev, image: '' }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
  };

  const formatCEP = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 5) {
      return numbers;
    }
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
  };

  const handleCEPChange = (e) => {
    const formatted = formatCEP(e.target.value);
    setCep(formatted);
  };

  const validateForm = () => {
    const newErrors = {};

    // Validar nome do evento
    if (!nameEvent.trim()) {
      newErrors.nameEvent = 'Nome do evento é obrigatório';
    }

    // Validar categoria
    if (!category || category === 'selection') {
      newErrors.category = 'Selecione uma categoria';
    }

    // Validar imagem
    if (!image) {
      newErrors.image = 'Imagem de divulgação é obrigatória';
    }

    // Validar classificação
    if (!classification || classification === 'selection') {
      newErrors.classification = 'Selecione uma classificação indicativa';
    }

    // Validar data de início
    if (!dateInicio) {
      newErrors.dateInicio = 'Data de início é obrigatória';
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const startDate = new Date(dateInicio);
      
      if (startDate < today) {
        newErrors.dateInicio = 'A data de início não pode ser no passado';
      }
    }

    // Validar hora de início
    if (!timeInicio) {
      newErrors.timeInicio = 'Hora de início é obrigatória';
    }

    // Validar data de término
    if (!dateTermino) {
      newErrors.dateTermino = 'Data de término é obrigatória';
    } else if (dateInicio && dateTermino) {
      const start = new Date(`${dateInicio}T${timeInicio || '00:00'}`);
      const end = new Date(`${dateTermino}T${timeTermino || '00:00'}`);
      
      if (end <= start) {
        newErrors.dateTermino = 'A data/hora de término deve ser posterior à de início';
      }
    }

    // Validar hora de término
    if (!timeTermino) {
      newErrors.timeTermino = 'Hora de término é obrigatória';
    }

    // Validar descrição
    if (!descricao.trim()) {
      newErrors.descricao = 'Descrição do evento é obrigatória';
    } else if (descricao.trim().length < 50) {
      newErrors.descricao = 'A descrição deve ter pelo menos 50 caracteres';
    }

    // Validar local
    if (!localEvento.trim()) {
      newErrors.localEvento = 'Informe o local do evento';
    }

    // Validar avenida/rua
    if (!avenidaRua.trim()) {
      newErrors.avenidaRua = 'Avenida/Rua é obrigatória';
    }

    // Validar estado
    if (!estado) {
      newErrors.estado = 'Selecione um estado';
    }

    // Validar cidade
    if (!cidade.trim()) {
      newErrors.cidade = 'Cidade é obrigatória';
    }

    // Validar bairro
    if (!bairro.trim()) {
      newErrors.bairro = 'Bairro é obrigatório';
    }

    // Validar CEP (opcional, mas se preenchido deve estar correto)
    if (cep && cep.replace(/\D/g, '').length !== 8) {
      newErrors.cep = 'CEP inválido (formato: 00000-000)';
    }

    // Validar termos
    if (!aceitaTermos) {
      newErrors.aceitaTermos = 'Você deve aceitar os termos para publicar o evento';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      // Scroll para o primeiro erro
      const firstErrorField = document.querySelector('.error-message');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    // Simular envio (substitua pela sua lógica real)
    try {
      const eventData = {
        nameEvent,
        category,
        image,
        classification,
        dateInicio,
        timeInicio,
        dateTermino,
        timeTermino,
        descricao,
        endereco: {
          localEvento,
          avenidaRua,
          cidade,
          complemento,
          cep,
          bairro,
          numero,
          estado
        }
      };

      console.log('Dados do evento:', eventData);
      
      // Aqui você faria a requisição para sua API
      // await api.post('/eventos', eventData);
      
      alert('Evento publicado com sucesso!');
      
    } catch (error) {
      console.error('Erro ao publicar evento:', error);
      alert('Erro ao publicar evento. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className='box-01'>
        <div className='content-principal'>
          {/* MANTENDO A TAG FORM PARA PRESERVAR A ESTILIZAÇÃO */}
          <form onSubmit={(e) => e.preventDefault()}>
            <h2 className='titulo-style'>Agora vamos detalhar esse evento!</h2>
            <p className='titulo2-style'>1. Informações básicas</p>

            {/* Linha 1 */}
            <div className='form-linha'>
              <div>
                <label htmlFor="nameEvent" className='nome-evento'>Nome do Evento*</label>
                <input
                  id="nameEvent"
                  type="text"
                  value={nameEvent}
                  onChange={(e) => setEventName(e.target.value)}
                  placeholder="Digite o nome"
                  aria-invalid={!!errors.nameEvent}
                  aria-describedby={errors.nameEvent ? "nameEvent-error" : undefined}
                />
                {errors.nameEvent && (
                  <span id="nameEvent-error" className="error-message">{errors.nameEvent}</span>
                )}
              </div>

              <div>
                <label htmlFor="category">Categoria*</label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  aria-invalid={!!errors.category}
                  aria-describedby={errors.category ? "category-error" : undefined}
                >
                  <option value="selection">Selecione</option>
                  <option value="opcao1">Opção 1</option>
                  <option value="opcao2">Opção 2</option>
                  <option value="opcao3">Opção 3</option>
                  <option value="opcao4">Opção 4</option>
                </select>
                {errors.category && (
                  <span id="category-error" className="error-message">{errors.category}</span>
                )}
              </div>
            </div>

            {/* Linha 2 */}
            <div className='form-linha'>
              <div>
                <label>Imagem de Divulgação*</label>
                <div
                  className='upload-imagem'
                  onClick={() => document.getElementById('fileInput').click()}
                  style={{ cursor: "pointer" }}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      document.getElementById('fileInput').click();
                    }
                  }}
                  aria-label="Clique para adicionar imagem de divulgação"
                >
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file-input-hidden"
                    aria-describedby={errors.image ? "image-error" : undefined}
                  />

                  {preview ? (
                    <div className="container-preview">
                      <img
                        src={preview}
                        alt="Preview da imagem de divulgação"
                        className="preview-image"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveImage();
                        }}
                        className="botao-remover"
                        type="button"
                        aria-label="Remover imagem"
                      />
                    </div>
                  ) : (
                    <div className="upload-placeholder">
                      <p>Clique para adicionar imagem</p>
                    </div>
                  )}
                </div>
                {errors.image && (
                  <span id="image-error" className="error-message">{errors.image}</span>
                )}
              </div>

              <div>
                <label htmlFor="classification" className='classificacao'>Classificação indicativa*</label>
                <select
                  id="classification"
                  value={classification}
                  onChange={(e) => setClassification(e.target.value)}
                  aria-invalid={!!errors.classification}
                  aria-describedby={errors.classification ? "classification-error" : undefined}
                >
                  <option value="selection">Selecione</option>
                  <option value="Livre">Livre para Todos</option>
                  <option value="10+">Acima de 10 anos</option>
                  <option value="12+">Acima de 12 anos</option>
                  <option value="14+">Acima de 14 anos</option>
                  <option value="16+">Acima de 16 anos</option>
                  <option value="Maior de Idade">Para Maiores de Idade</option>
                </select>
                {errors.classification && (
                  <span id="classification-error" className="error-message">{errors.classification}</span>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* BOX 02 */}
      <div className='box-02'>
        <h2 className='titulo-style'>2. Data e horário</h2>
        <p>Informe quando seu evento irá acontecer</p>

        <div className='form-linha-datas'>
          {/* Data início */}
          <div className="campo">
            <label htmlFor="dateInicio">Data de início*</label>
            <div className="input-simples">
              <div className="icon-area" onClick={() => document.getElementById('dateInicio').showPicker()}>
                <img src="/assets/criacao-evento/icon-data.svg" alt="" />
              </div>
              <input
                id="dateInicio"
                type="date"
                value={dateInicio}
                onChange={(e) => setDateInicio(e.target.value)}
                aria-invalid={!!errors.dateInicio}
                aria-describedby={errors.dateInicio ? "dateInicio-error" : undefined}
              />
            </div>
            {errors.dateInicio && (
              <span id="dateInicio-error" className="error-message">{errors.dateInicio}</span>
            )}
          </div>

          {/* Hora início */}
          <div className="campo">
            <label htmlFor="timeInicio">Hora de início*</label>
            <div className="input-simples">
              <div className="icon-area" onClick={() => document.getElementById('timeInicio').showPicker()}>
                <img src="/assets/criacao-evento/icon-hora.svg" alt="" />
              </div>
              <input
                id="timeInicio"
                type="time"
                value={timeInicio}
                onChange={(e) => setTimeInicio(e.target.value)}
                aria-invalid={!!errors.timeInicio}
                aria-describedby={errors.timeInicio ? "timeInicio-error" : undefined}
              />
            </div>
            {errors.timeInicio && (
              <span id="timeInicio-error" className="error-message">{errors.timeInicio}</span>
            )}
          </div>

          {/* Data término */}
          <div className="campo">
            <label htmlFor="dateTermino">Data de término*</label>
            <div className="input-simples">
              <div className="icon-area" onClick={() => document.getElementById('dateTermino').showPicker()}>
                <img src="/assets/criacao-evento/icon-data.svg" alt="" />
              </div>
              <input
                id="dateTermino"
                type="date"
                value={dateTermino}
                onChange={(e) => setDateTermino(e.target.value)}
                aria-invalid={!!errors.dateTermino}
                aria-describedby={errors.dateTermino ? "dateTermino-error" : undefined}
              />
            </div>
            {errors.dateTermino && (
              <span id="dateTermino-error" className="error-message">{errors.dateTermino}</span>
            )}
          </div>

          {/* Hora término */}
          <div className="campo">
            <label htmlFor="timeTermino">Hora de término*</label>
            <div className="input-simples">
              <div className="icon-area" onClick={() => document.getElementById('timeTermino').showPicker()}>
                <img src="/assets/criacao-evento/icon-hora.svg" alt="" />
              </div>
              <input
                id="timeTermino"
                type="time"
                value={timeTermino}
                onChange={(e) => setTimeTermino(e.target.value)}
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

      {/* BOX 03 */}
      <div className='box-03'>
        <h2 className='titulo-style'>3. Descrição do evento</h2>
        <p>Conte todos os detalhes do seu evento</p>

        <div className='campo-descricao'>
          <textarea
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Digite a descrição do evento..."
            className='textarea-descricao'
            rows={8}
            aria-invalid={!!errors.descricao}
            aria-describedby={errors.descricao ? "descricao-error" : undefined}
          />
        </div>

        <div className='contador-caracteres'>
          <span>{descricao.length} caracteres</span>
        </div>
        {errors.descricao && (
          <span id="descricao-error" className="error-message">{errors.descricao}</span>
        )}
      </div>

      {/* BOX 04 */}
      <div className='box-04'>
        <h2 className='titulo-style'>4. Local do evento</h2>

        <div className='form-linha-local'>
          {/* Coluna 1 */}
          <div className='coluna-local'>
            <div className='campo-local'>
              <label htmlFor="localEvento">Informe o local do evento *</label>
              <input
                id="localEvento"
                type="text"
                value={localEvento}
                onChange={(e) => setLocalEvento(e.target.value)}
                aria-invalid={!!errors.localEvento}
                aria-describedby={errors.localEvento ? "localEvento-error" : undefined}
              />
              {errors.localEvento && (
                <span id="localEvento-error" className="error-message">{errors.localEvento}</span>
              )}
            </div>

            <div className='campo-local'>
              <label htmlFor="avenidaRua">Av./Rua*</label>
              <input
                id="avenidaRua"
                type="text"
                value={avenidaRua}
                onChange={(e) => setAvenidaRua(e.target.value)}
                aria-invalid={!!errors.avenidaRua}
                aria-describedby={errors.avenidaRua ? "avenidaRua-error" : undefined}
              />
              {errors.avenidaRua && (
                <span id="avenidaRua-error" className="error-message">{errors.avenidaRua}</span>
              )}
            </div>

            <div className='campo-local'>
              <label htmlFor="complemento">Complemento</label>
              <input
                id="complemento"
                type="text"
                value={complemento}
                onChange={(e) => setComplemento(e.target.value)}
              />
            </div>

            <div className='campo-local'>
              <label htmlFor="bairro">Bairro*</label>
              <input
                id="bairro"
                type="text"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                aria-invalid={!!errors.bairro}
                aria-describedby={errors.bairro ? "bairro-error" : undefined}
              />
              {errors.bairro && (
                <span id="bairro-error" className="error-message">{errors.bairro}</span>
              )}
            </div>
          </div>

          {/* Coluna 2 */}
          <div className='coluna-local'>
            <div className='campo-local'>
              <label htmlFor="estado">Estado*</label>
              <select
                id="estado"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                aria-invalid={!!errors.estado}
                aria-describedby={errors.estado ? "estado-error" : undefined}
              >
                <option value="">Selecione um estado</option>
                {[
                  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
                  "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
                  "RS", "RO", "RR", "SC", "SP", "SE", "TO"
                ].map(uf => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
              {errors.estado && (
                <span id="estado-error" className="error-message">{errors.estado}</span>
              )}
            </div>

            <div className='campo-local'>
              <label htmlFor="cidade">Cidade*</label>
              <input
                id="cidade"
                type="text"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                aria-invalid={!!errors.cidade}
                aria-describedby={errors.cidade ? "cidade-error" : undefined}
              />
              {errors.cidade && (
                <span id="cidade-error" className="error-message">{errors.cidade}</span>
              )}
            </div>

            <div className='campo-local'>
              <label htmlFor="cep">CEP</label>
              <input
                id="cep"
                type="text"
                value={cep}
                onChange={handleCEPChange}
                placeholder="00000-000"
                maxLength="9"
                aria-invalid={!!errors.cep}
                aria-describedby={errors.cep ? "cep-error" : undefined}
              />
              {errors.cep && (
                <span id="cep-error" className="error-message">{errors.cep}</span>
              )}
            </div>

            <div className='campo-local'>
              <label htmlFor="numero">Número</label>
              <input
                id="numero"
                type="text"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="box-05">
        <h3>5. Ingressos</h3>
        <p>Crie o ingresso ideal para o seu evento!</p>

        <div className="buttons-wrapper">
          <button 
            type="button"
            className="btn-ingresso"
            aria-label="Adicionar ingresso pago"
          >
            <span className="icon">+</span>
            Ingresso pago
          </button>

          <button 
            type="button"
            className="btn-ingresso"
            aria-label="Adicionar ingresso gratuito"
          >
            <span className="icon">+</span>
            Ingresso gratuito
          </button>
        </div>
      </div>

      <div className='box-07'>
        <h2 className='titulo-style'>6. Responsabilidades</h2>

        <div className='responsabilidades-container'>
          <label className='checkbox-wrapper'>
            <input
              id="aceitaTermos"
              type="checkbox"
              checked={aceitaTermos}
              onChange={(e) => setAceitaTermos(e.target.checked)}
              className='checkbox-input'
              aria-invalid={!!errors.aceitaTermos}
              aria-describedby={errors.aceitaTermos ? "aceitaTermos-error" : undefined}
            />
            <div className={`checkbox-custom ${aceitaTermos ? 'checked' : ''}`}>
              {aceitaTermos && (
                <svg
                  className='checkbox-icon'
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

          <p className='responsabilidades-texto'>
            Ao publicar este evento, estou de acordo com os Termos de uso, com as Diretrizes de Comunidade e com as Regras de meia-entrada, bem como declaro estar ciente da Política de Privacidade e das Obrigatoriedades Legais.
          </p>
        </div>
        {errors.aceitaTermos && (
          <span id="aceitaTermos-error" className="error-message">{errors.aceitaTermos}</span>
        )}
      </div>

      <div className="box-08">
        <button 
          type="button"
          className="btn-publicar-evento"
          onClick={handleSubmit}
          disabled={isSubmitting}
          aria-label={isSubmitting ? "Publicando evento..." : "Publicar evento"}
        >
          <span className="btn-text">
            {isSubmitting ? 'Publicando...' : 'Publicar evento'}
          </span>
        </button>
      </div>
    </div>
  )
}

export default CriacaoEvento;