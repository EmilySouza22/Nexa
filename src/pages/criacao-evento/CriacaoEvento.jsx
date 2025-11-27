import React from 'react'
import { useState } from 'react';
import './CriacaoEvento.css';
import iconAdicionar from '../../assets/criacao-evento/icon-adicionar.svg';

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
  const [loading, setLoading] = useState(false);

  const [ingressos, setIngressos] = useState([]);
  const [showIngressoForm, setShowIngressoForm] = useState(false);
  const [tipoIngressoForm, setTipoIngressoForm] = useState('');

  const [ingressoForm, setIngressoForm] = useState({
    titulo: '',
    idtipo_ingresso: 1,
    quantidade: '',
    valor_unitario: '',
    data_inicio: '',
    data_termino: '',
    max_qtd_por_compra: ''
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
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

  const handleAbrirFormIngresso = (tipo) => {
    setTipoIngressoForm(tipo);
    setShowIngressoForm(true);
    setIngressoForm({
      titulo: '',
      idtipo_ingresso: tipo === 'pago' ? 1 : 2,
      quantidade: '',
      valor_unitario: tipo === 'gratuito' ? 0 : '',
      data_inicio: '',
      data_termino: '',
      max_qtd_por_compra: ''
    });
  };

  const handleAdicionarIngresso = () => {
    if (!ingressoForm.titulo || !ingressoForm.quantidade) {
      alert('Preencha o título e quantidade do ingresso!');
      return;
    }

    if (tipoIngressoForm === 'pago' && !ingressoForm.valor_unitario) {
      alert('Preencha o valor do ingresso!');
      return;
    }

    const novoIngresso = {
      ...ingressoForm,
      vendidos: 0,
      max_qtd_por_compra: ingressoForm.max_qtd_por_compra || ingressoForm.quantidade
    };

    setIngressos([...ingressos, novoIngresso]);
    setShowIngressoForm(false);
  };

  const handleRemoverIngresso = (index) => {
    setIngressos(ingressos.filter((_, i) => i !== index));
  };

  const handleEditarIngresso = (index) => {
    const ingresso = ingressos[index];
    setIngressoForm(ingresso);
    setTipoIngressoForm(ingresso.valor_unitario > 0 ? 'pago' : 'gratuito');
    setShowIngressoForm(true);
    handleRemoverIngresso(index);
  };

  const handlePublicarEvento = async (e) => {
    e.preventDefault();
    
    if (!nameEvent || !category || !dateInicio || !timeInicio || !dateTermino || !timeTermino) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    if (!aceitaTermos) {
      alert('Você precisa aceitar os termos de responsabilidade!');
      return;
    }

    setLoading(true);

  try {
    const dataInicioFormatada = `${dateInicio} ${timeInicio}:00`;
    const dataTerminoFormatada = `${dateTermino} ${timeTermino}:00`;

    const eventData = {
      nome: nameEvent,
      idcategoria_evento: parseInt(category),
      assunto_principal: descricao,
      classificacao: classification,
      data_inicio: dataInicioFormatada,
      data_termino: dataTerminoFormatada,
      idconta: 2, //  PEGAR DO CONTEXTO DE AUTENTICAÇÃO
      endereco: {
        local: localEvento,
        rua: avenidaRua,
        complemento: complemento,
        bairro: bairro,
        cidade: cidade,
        estado: estado,
        cep: cep,
        numero: numero
      },
      ingressos: ingressos
    };

      if (response.ok) {
        alert('Evento criado com sucesso!');
        console.log('ID do evento criado:', data.idevento);
      } else {
        alert(`Erro: ${data.error}`);
      }

    } catch (error) {
      console.error('Erro ao criar evento:', error);
      alert('Erro ao conectar com o servidor. Tente novamente!');
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div>

      <div className='box-01'>
        <div className='content-principal'>
          <form>
            <h2 className='titulo-style'>Agora vamos detalhar esse evento!</h2>
            <p className='titulo2-style'>1. Informações básicas</p>

            {/* Linha 1 */}
            <div className='form-linha'>
              <div>
                <label className='nome-evento'>Nome do Evento*</label>
                <input
                  type="text"
                  value={nameEvent}
                  onChange={(e) => setEventName(e.target.value)}
                  placeholder="Digite o nome"
                />
              </div>

              <div>
                <label>Categoria</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="selection">Selecione</option>
                  <option value="opcao1">Festas</option>
                  <option value="opcao2">Teatros</option>
                  <option value="opcao3">Infantil</option>
                  <option value="opcao4">Shows</option>
                  <option value="opcao4">Stand Up</option>
                  <option value="opcao4">Esportivos</option>
                  <option value="opcao4">Workshops</option>
                  <option value="opcao4">Online</option>
                  <option value="opcao4">Online</option>
                  <option value="opcao4">Gatronomia</option>
                </select>
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
                >
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file-input-hidden"
                  />

                  {preview ? (
                    <div className="container-preview">
                      <img
                        src={preview}
                        alt="Preview"
                        className="preview-image"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveImage();
                        }}
                        className="botao-remover"
                        type="button"
                      />
                    </div>
                  ) : (
                    <div className="upload-placeholder">
                      <img src={iconAdicionar} alt="Adicionar" className="upload-icon" />
                      <p>Clique para adicionar imagem</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className='classificacao'>Classificação indicativa</label>
                <select
                  value={classification}
                  onChange={(e) => setClassification(e.target.value)}
                >
                  <option value="selection">Selecione</option>
                  <option value="Livre">Livre para Todos</option>
                  <option value="10+">Acima de 10 anos</option>
                  <option value="12+">Acima de 12 anos</option>
                  <option value="14+">Acima de 14 anos</option>
                  <option value="16+">Acima de 16 anos</option>
                  <option value="Maior de Idade">Para Maiores de Idade</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* BOX 02 */}
      {/* BOX 02 - VERSÃO CORRIGIDA */}
      <div className='box-02'>
        <h2 className='titulo-style'>Data e horário</h2>
        <p>Informe quando seu evento irá acontecer</p>

        <div className='form-linha-datas'>
          {/* Data início */}
          <div className="campo">
            <label>Data de início*</label>
            <div className="input-simples">
              <div className="icon-area" onClick={() => document.getElementById('dateInicio').showPicker()}>
                <img src="/assets/criacao-evento/icon-data.svg" alt="Calendário" />
              </div>
              <input
                id="dateInicio"
                type="date"
                value={dateInicio}
                onChange={(e) => setDateInicio(e.target.value)}
              />
            </div>
          </div>

          {/* Hora início */}
          <div className="campo">
            <label>Hora de início*</label>
            <div className="input-simples">
              <div className="icon-area" onClick={() => document.getElementById('timeInicio').showPicker()}>
                <img src="/assets/criacao-evento/icon-hora.svg" alt="Relógio" />
              </div>
              <input
                id="timeInicio"
                type="time"
                value={timeInicio}
                onChange={(e) => setTimeInicio(e.target.value)}
              />
            </div>
          </div>

          {/* Data término */}
          <div className="campo">
            <label>Data de término*</label>
            <div className="input-simples">
              <div className="icon-area" onClick={() => document.getElementById('dateTermino').showPicker()}>
                <img src="/assets/criacao-evento/icon-data.svg" alt="Calendário" />
              </div>
              <input
                id="dateTermino"
                type="date"
                value={dateTermino}
                onChange={(e) => setDateTermino(e.target.value)}
              />
            </div>
          </div>

          {/* Hora término */}
          <div className="campo">
            <label>Hora de término*</label>
            <div className="input-simples">
              <div className="icon-area" onClick={() => document.getElementById('timeTermino').showPicker()}>
                <img src="/assets/criacao-evento/icon-hora.svg" alt="Relógio" />
              </div>
              <input
                id="timeTermino"
                type="time"
                value={timeTermino}
                onChange={(e) => setTimeTermino(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* BOX 03 */}
      <div className='box-03'>
        <h2 className='titulo-style'>3. Descrição do evento</h2>
        <p>Conte todos os detalhes do seu evento</p>

        <div className='campo-descricao'>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Digite a descrição do evento..."
            className='textarea-descricao'
            rows={8}
          />
        </div>

        <div className='contador-caracteres'>
          <span>{descricao.length} caracteres</span>
        </div>
      </div>

      {/* BOX 04 */}
      <div className='box-04'>
        <h2 className='titulo-style'>4. Local do evento</h2>

        <div className='form-linha-local'>
          {/* Coluna 1 */}
          <div className='coluna-local'>
            <div className='campo-local'>
              <label>Informe o local do evento *</label>
              <input
                type="text"
                value={localEvento}
                onChange={(e) => setLocalEvento(e.target.value)}
              />
            </div>

            <div className='campo-local'>
              <label>Av./Rua*</label>
              <input
                type="text"
                value={avenidaRua}
                onChange={(e) => setAvenidaRua(e.target.value)}
              />
            </div>

            <div className='campo-local'>
              <label>Complemento</label>
              <input
                type="text"
                value={complemento}
                onChange={(e) => setComplemento(e.target.value)}
              />
            </div>

            <div className='campo-local'>
              <label>Bairro*</label>
              <input
                type="text"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
              />
            </div>
          </div>

          {/* Coluna 2 */}
          <div className='coluna-local'>
            <div className='campo-local'>
              <label>Estado*</label>
              <select
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
              >
                <option value="">Selecione</option>
                {[
                  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
                  "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
                  "RS", "RO", "RR", "SC", "SP", "SE", "TO"
                ].map(uf => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </div>

            <div className='campo-local'>
              <label>Cidade*</label>
              <input
                type="text"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
              />
            </div>

            <div className='campo-local'>
              <label>CEP</label>
              <input
                type="text"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                placeholder="00000-000"
                maxLength="9"
              />
            </div>

            <div className='campo-local'>
              <label>Número</label>
              <input
                type="text"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div class="box-05">
        <h3>5. Ingressos</h3>
        <p>Crie o ingresso ideal para o seu evento!</p>

        <div class="buttons-wrapper">
          <button class="btn-ingresso">
            <span class="icon">+</span>
            Ingresso pago
          </button>

          <button class="btn-ingresso">
            <span class="icon">+</span>
            Ingresso gratuito
          </button>
        </div>

        <div class="alerta">
          <span class="alerta-icon">!</span>
          Atenção: A meia-entrada precisa ser a mesma para todos os grupos elegíveis
        </div>
      </div>

      <div className='box-07'>
        <h2 className='titulo-style'>7. Responsabilidades</h2>

        <div className='responsabilidades-container'>
          <label className='checkbox-wrapper'>
            <input
              type="checkbox"
              checked={aceitaTermos}
              onChange={(e) => setAceitaTermos(e.target.checked)}
              className='checkbox-input'
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
      </div>


      <div className="box-08">
        <button className="btn-publicar-evento">
          <span className="btn-text">Publicar evento</span>
        </button>
      </div>


    </div>
  )
}

export default CriacaoEvento;
