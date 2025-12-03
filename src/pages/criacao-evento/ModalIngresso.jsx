import React, { useState } from 'react';
import './ModalIngresso.css';

function ModalIngresso({ isOpen, onClose, tipo }) {
  const isPago = tipo === 'pago';
  
  const [formData, setFormData] = useState({
    titulo: '',
    quantidade: '',
    dataInicioVendas: '',
    horaInicio: '',
    dataTerminoVendas: '',
    horaTermino: '',
    quantidadeMaxima: '',
    valor: ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Dados do ingresso:', { ...formData, tipo });
    // Aqui você pode adicionar a lógica para salvar o ingresso
    onClose();
  };

  const handleCancel = () => {
    setFormData({
      titulo: '',
      quantidade: '',
      dataInicioVendas: '',
      horaInicio: '',
      dataTerminoVendas: '',
      horaTermino: '',
      quantidadeMaxima: '',
      valor: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            <span className="chevron-icon">»</span>
            Criando ingresso <span className={isPago ? 'tipo-pago' : 'tipo-gratuito'}>{tipo}</span>
          </h2>
        </div>

        <div className="modal-body">
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="titulo">Título do ingresso</label>
              <input
                id="titulo"
                type="text"
                value={formData.titulo}
                onChange={(e) => handleChange('titulo', e.target.value)}
                className="input-field"
              />
            </div>

            <div className="form-field">
              <label htmlFor="quantidade">Quantidade</label>
              <input
                id="quantidade"
                type="number"
                value={formData.quantidade}
                onChange={(e) => handleChange('quantidade', e.target.value)}
                className="input-field"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="dataInicioVendas">Data de início das vendas</label>
              <div className="input-with-icon">
         
                <input
                  id="dataInicioVendas"
                  type="date"
                  value={formData.dataInicioVendas}
                  onChange={(e) => handleChange('dataInicioVendas', e.target.value)}
                  className="input-field with-icon"
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="horaInicio">Hora de início</label>
              <div className="input-with-icon">
                
                <input
                  id="horaInicio"
                  type="time"
                  value={formData.horaInicio}
                  onChange={(e) => handleChange('horaInicio', e.target.value)}
                  className="input-field with-icon"
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="dataTerminoVendas">Data de término das vendas</label>
              <div className="input-with-icon">
         
                <input
                  id="dataTerminoVendas"
                  type="date"
                  value={formData.dataTerminoVendas}
                  onChange={(e) => handleChange('dataTerminoVendas', e.target.value)}
                  className="input-field with-icon"
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="horaTermino">Hora de término</label>
              <div className="input-with-icon">
             
                <input
                  id="horaTermino"
                  type="time"
                  value={formData.horaTermino}
                  onChange={(e) => handleChange('horaTermino', e.target.value)}
                  className="input-field with-icon"
                />
              </div>
            </div>
          </div>

          {isPago && (
            <div className="form-row single">
              <div className="form-field">
                <label htmlFor="quantidadeMaxima">Quantidade máxima permitida por compra</label>
                <input
                  id="quantidadeMaxima"
                  type="number"
                  value={formData.quantidadeMaxima}
                  onChange={(e) => handleChange('quantidadeMaxima', e.target.value)}
                  className="input-field"
                />
              </div>
            </div>
          )}

          {isPago && (
            <div className="form-row single">
              <div className="form-field">
                <label htmlFor="valor">Valor a receber</label>
                <input
                  id="valor"
                  type="text"
                  value={formData.valor}
                  onChange={(e) => handleChange('valor', e.target.value)}
                  className="input-field"
                  placeholder="R$ 0,00"
                />
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn-cancelar"
            onClick={handleCancel}
          >
            <span className="btn-icon">✕</span>
            Cancelar
          </button>

          <button
            type="button"
            className="btn-criar"
            onClick={handleSubmit}
          >
            <span className="btn-icon">+</span>
            Criar Ingresso
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalIngresso;