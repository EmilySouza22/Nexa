import React from 'react'
import { useState } from 'react';

function CriacaoEvento() {
  const [nameEvent, setEventName] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [classification, setClassification] = useState('');

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
    <div className='box-01'>
      <form>
        <h2 className='titulo-style'>Agora vamos detalhar esse evento!</h2>
        <p className='titulo2-style'>1. Informações básicas</p>

        {/* Linha 1: Nome e Categoria lado a lado */}
        <div className='form-row'>
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
            <label>
              Categoria
            </label>
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

        <div>
          <label>
            Imagem de Divulgação*
          </label>
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
              <div className="preview-container">
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
                  className="remove-button"
                  type="button"
                />
              </div>
            ) : (
              <div className="upload-placeholder">
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
      </form>
    </div>
  )
}

export default CriacaoEvento