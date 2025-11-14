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

            {/* Linha 1: Nome e Categoria lado a lado */}
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

            {/* Linha 2: Imagem e Classificação lado a lado */}
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
                <label className='classificacao'>
                  Classificação indicativa
                </label>
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
              <div className="icon-area">
                <img src="/assets/criacao-evento/icon-hora.svg" alt="Relógio" />
              </div>
              <input
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
              <div className="icon-area">
                <img src="/assets/criacao-evento/icon-data.svg" alt="Calendário" />
              </div>
              <input
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
              <div className="icon-area">
                <img src="/assets/criacao-evento/icon-hora.svg" alt="Relógio" />
              </div>
              <input
                type="time"
                value={timeTermino}
                onChange={(e) => setTimeTermino(e.target.value)}
              />
            </div>
          </div>

        </div>
      </div>

      <div className='box-03'>

      </div>

      <div className='box-04'>

      </div>

      <div className='box-05'>

      </div>

      <div className='box-06'>

      </div>

      <div className='box-07'>
      </div>

    </div>

  )
}

export default CriacaoEvento