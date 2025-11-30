import React, { useState } from 'react';
import './ModalIngresso.css';

/* -------------------------------------------------------------------------- */
/*                           MODAL INGRESSO PAGO                              */
/* -------------------------------------------------------------------------- */

export function ModalIngressoPago({ isOpen, onClose, onCriar }) {
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
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.titulo || !formData.quantidade || !formData.valor) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    onCriar({ ...formData, tipo: 'pago' });
    
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
  };

  const handleCancel = () => {
    onClose();
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
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay-pago" onClick={onClose}>
      <div className="modal-content-pago" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-pago">
          <div className="modal-titulo-wrapper-pago">
            <span className="modal-icone-pago">»</span>
            <h3 className="modal-titulo-pago">
              Criando ingresso <span className="tipo-pago">pago</span>
            </h3>
          </div>
        </div>

        <div className="modal-body-pago">
          {/* Linha 1: Título e Quantidade */}
          <div className="form-row-pago">
            <div className="form-group-pago flex-2-pago">
              <label htmlFor="titulo-pago">Título do ingresso</label>
              <input
                id="titulo-pago"
                type="text"
                value={formData.titulo}
                onChange={(e) => handleChange('titulo', e.target.value)}
                placeholder="Ex: VIP, Pista, Camarote..."
              />
            </div>
            <div className="form-group-pago flex-1-pago">
              <label htmlFor="quantidade-pago">Quantidade</label>
              <input
                id="quantidade-pago"
                type="number"
                value={formData.quantidade}
                onChange={(e) => handleChange('quantidade', e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          {/* Linha 2: Data e Hora de Início */}
          <div className="form-row-pago">
            <div className="form-group-pago flex-1-pago">
              <label htmlFor="data-inicio-pago">Data de início das vendas</label>
              <div className="input-with-icon-pago">
                <span className="input-icon-pago">📅</span>
                <input
                  id="data-inicio-pago"
                  type="date"
                  value={formData.dataInicioVendas}
                  onChange={(e) => handleChange('dataInicioVendas', e.target.value)}
                />
              </div>
            </div>
            <div className="form-group-pago flex-1-pago">
              <label htmlFor="hora-inicio-pago">Hora de início</label>
              <div className="input-with-icon-pago">
                <span className="input-icon-pago">🕐</span>
                <input
                  id="hora-inicio-pago"
                  type="time"
                  value={formData.horaInicio}
                  onChange={(e) => handleChange('horaInicio', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Linha 3: Data e Hora de Término */}
          <div className="form-row-pago">
            <div className="form-group-pago flex-1-pago">
              <label htmlFor="data-termino-pago">Data de término das vendas</label>
              <div className="input-with-icon-pago">
                <span className="input-icon-pago">📅</span>
                <input
                  id="data-termino-pago"
                  type="date"
                  value={formData.dataTerminoVendas}
                  onChange={(e) => handleChange('dataTerminoVendas', e.target.value)}
                />
              </div>
            </div>
            <div className="form-group-pago flex-1-pago">
              <label htmlFor="hora-termino-pago">Hora de término</label>
              <div className="input-with-icon-pago">
                <span className="input-icon-pago">🕐</span>
                <input
                  id="hora-termino-pago"
                  type="time"
                  value={formData.horaTermino}
                  onChange={(e) => handleChange('horaTermino', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Linha 4: Quantidade Máxima */}
          <div className="form-row-pago">
            <div className="form-group-pago">
              <label htmlFor="qtd-maxima-pago">Quantidade máxima permitida por compra</label>
              <input
                id="qtd-maxima-pago"
                type="number"
                value={formData.quantidadeMaxima}
                onChange={(e) => handleChange('quantidadeMaxima', e.target.value)}
                placeholder="0"
                className="input-small-pago"
              />
            </div>
          </div>

          {/* Linha 5: Valor */}
          <div className="form-row-pago">
            <div className="form-group-pago">
              <label htmlFor="valor-pago">Valor a receber</label>
              <input
                id="valor-pago"
                type="text"
                value={formData.valor}
                onChange={(e) => handleChange('valor', e.target.value)}
                placeholder="R$ 0,00"
                className="input-small-pago"
              />
            </div>
          </div>
        </div>

        <div className="modal-footer-pago">
          <button 
            type="button"
            className="btn-cancelar-pago"
            onClick={handleCancel}
          >
            <span className="btn-icon-cancelar-pago">↩</span>
            Cancelar
          </button>
          <button 
            type="button"
            className="btn-criar-pago"
            onClick={handleSubmit}
          >
            <span className="btn-icon-criar-pago">💳</span>
            Criar ingresso
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                         MODAL INGRESSO GRATUITO                            */
/* -------------------------------------------------------------------------- */

export function ModalIngressoGratuito({ isOpen, onClose, onCriar }) {
  const [formData, setFormData] = useState({
    titulo: '',
    quantidade: '',
    dataInicioVendas: '',
    horaInicio: '',
    dataTerminoVendas: '',
    horaTermino: ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.titulo || !formData.quantidade) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    onCriar({ ...formData, tipo: 'gratuito', valor: '0,00' });
    
    setFormData({
      titulo: '',
      quantidade: '',
      dataInicioVendas: '',
      horaInicio: '',
      dataTerminoVendas: '',
      horaTermino: ''
    });
  };

  const handleCancel = () => {
    onClose();
    setFormData({
      titulo: '',
      quantidade: '',
      dataInicioVendas: '',
      horaInicio: '',
      dataTerminoVendas: '',
      horaTermino: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay-gratuito" onClick={onClose}>
      <div className="modal-content-gratuito" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-gratuito">
          <div className="modal-titulo-wrapper-gratuito">
            <span className="modal-icone-gratuito">»</span>
            <h3 className="modal-titulo-gratuito">
              Criando ingresso <span className="tipo-gratuito">gratuito</span>
            </h3>
          </div>
        </div>

        <div className="modal-body-gratuito">
          {/* Linha 1: Título e Quantidade */}
          <div className="form-row-gratuito">
            <div className="form-group-gratuito flex-2-gratuito">
              <label htmlFor="titulo-gratuito">Título do ingresso</label>
              <input
                id="titulo-gratuito"
                type="text"
                value={formData.titulo}
                onChange={(e) => handleChange('titulo', e.target.value)}
                placeholder="Ex: Entrada Franca, Cortesia..."
              />
            </div>
            <div className="form-group-gratuito flex-1-gratuito">
              <label htmlFor="quantidade-gratuito">Quantidade</label>
              <input
                id="quantidade-gratuito"
                type="number"
                value={formData.quantidade}
                onChange={(e) => handleChange('quantidade', e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          {/* Linha 2: Data e Hora de Início */}
          <div className="form-row-gratuito">
            <div className="form-group-gratuito flex-1-gratuito">
              <label htmlFor="data-inicio-gratuito">Data de início das vendas</label>
              <div className="input-with-icon-gratuito">
                <span className="input-icon-gratuito">📅</span>
                <input
                  id="data-inicio-gratuito"
                  type="date"
                  value={formData.dataInicioVendas}
                  onChange={(e) => handleChange('dataInicioVendas', e.target.value)}
                />
              </div>
            </div>
            <div className="form-group-gratuito flex-1-gratuito">
              <label htmlFor="hora-inicio-gratuito">Hora de início</label>
              <div className="input-with-icon-gratuito">
                <span className="input-icon-gratuito">🕐</span>
                <input
                  id="hora-inicio-gratuito"
                  type="time"
                  value={formData.horaInicio}
                  onChange={(e) => handleChange('horaInicio', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Linha 3: Data e Hora de Término */}
          <div className="form-row-gratuito">
            <div className="form-group-gratuito flex-1-gratuito">
              <label htmlFor="data-termino-gratuito">Data de término das vendas</label>
              <div className="input-with-icon-gratuito">
                <span className="input-icon-gratuito">📅</span>
                <input
                  id="data-termino-gratuito"
                  type="date"
                  value={formData.dataTerminoVendas}
                  onChange={(e) => handleChange('dataTerminoVendas', e.target.value)}
                />
              </div>
            </div>
            <div className="form-group-gratuito flex-1-gratuito">
              <label htmlFor="hora-termino-gratuito">Hora de término</label>
              <div className="input-with-icon-gratuito">
                <span className="input-icon-gratuito">🕐</span>
                <input
                  id="hora-termino-gratuito"
                  type="time"
                  value={formData.horaTermino}
                  onChange={(e) => handleChange('horaTermino', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer-gratuito">
          <button 
            type="button"
            className="btn-cancelar-gratuito"
            onClick={handleCancel}
          >
            <span className="btn-icon-cancelar-gratuito">↩</span>
            Cancelar
          </button>
          <button 
            type="button"
            className="btn-criar-gratuito"
            onClick={handleSubmit}
          >
            <span className="btn-icon-criar-gratuito">💳</span>
            Criar ingresso
          </button>
        </div>
      </div>
    </div>
  );
}