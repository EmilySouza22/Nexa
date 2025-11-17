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
  const [organizadorNome, setOrganizadorNome] = useState('');
  const [organizadorDescricao, setOrganizadorDescricao] = useState('');

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
                  <option value="opcao1">Opção 1</option>
                  <option value="opcao2">Opção 2</option>
                  <option value="opcao3">Opção 3</option>
                  <option value="opcao4">Opção 4</option>
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
      <div className='box-02'>
        <h2 className='titulo-style'>Data e horário</h2>
        <p>Informe quando seu evento irá acontecer</p>

        <div className='form-linha'>
          {/* Data início */}
          <div className="campo">
            <label>Data de início*</label>
            <div className="input-simples">
              <div className="icon-area">
                <img src="/assets/criacao-evento/icon-data.svg" alt="Calendário" />
              </div>
              <input
                type="text"
                placeholder="dd/mm/aaaa"
                value={dateInicio}
                onChange={(e) => setDateInicio(e.target.value)}
                onFocus={(e) => e.target.type = 'date'}
                onBlur={(e) => !e.target.value ? e.target.type = 'text' : null}
              />
            </div>
          </div>

          {/* Hora início */}
          <div className="campo">
            <label>Hora de início*</label>
            <div className="input-simples">
              <div className="icon-area">
                <img src="/assets/criacao-evento/icon-hora.svg" alt="Relógio" />
              </div>
              <input
                type="text"
                placeholder="--:--"
                value={timeInicio}
                onChange={(e) => setTimeInicio(e.target.value)}
                onFocus={(e) => e.target.type = 'time'}
                onBlur={(e) => !e.target.value ? e.target.type = 'text' : null}
              />
            </div>
          </div>

          {/* Data término */}
          <div className="campo">
            <label>Data de término*</label>
            <div className="input-simples">
              <div className="icon-area">
                <img src="/assets/criacao-evento/icon-data.svg" alt="Calendário" />
              </div>
              <input
                type="text"
                placeholder="dd/mm/aaaa"
                value={dateTermino}
                onChange={(e) => setDateTermino(e.target.value)}
                onFocus={(e) => e.target.type = 'date'}
                onBlur={(e) => !e.target.value ? e.target.type = 'text' : null}
              />
            </div>
          </div>

          {/* Hora término */}
          <div className="campo">
            <label>Hora de término*</label>
            <div className="input-simples">
              <div className="icon-area">
                <img src="/assets/criacao-evento/icon-hora.svg" alt="Relógio" />
              </div>
              <input
                type="text"
                placeholder="--:--"
                value={timeTermino}
                onChange={(e) => setTimeTermino(e.target.value)}
                onFocus={(e) => e.target.type = 'time'}
                onBlur={(e) => !e.target.value ? e.target.type = 'text' : null}
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

      {/* BOX 06 */}
      <div className='box-06'>
        <h2 className='titulo-style'>6. Sobre o organizador</h2>
        <p className='descricao-box'>
          Conte um pouco sobre você ou a sua empresa. É importante mostrar ao público
          quem está por trás do evento.
        </p>

        <div className='campo'>
          <label>Nome *</label>
          <input
            type='text'
            placeholder='Digite o nome do organizador'
            value={organizadorNome}
            onChange={(e) => setOrganizadorNome(e.target.value)}
          />
        </div>

        <div className='campo'>
          <label>Descrição *</label>
          <textarea
            placeholder='Fale brevemente sobre você ou a empresa'
            value={organizadorDescricao}
            onChange={(e) => setOrganizadorDescricao(e.target.value)}
          />
        </div>
      </div>

      <div className='box-07'></div>

    </div>
  )
}

export default CriacaoEvento;
