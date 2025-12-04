import React, { useState } from 'react';
import './SecaoIngresso.css';

const SecaoIngressos = () => {
  const [modalAberto, setModalAberto] = useState(false);
  const [tipoIngresso, setTipoIngresso] = useState(null);
  const [formData, setFormData] = useState({
    nomeIngresso: '',
    quantidade: '',
    preco: '',
    dataInicio: '',
    dataFim: '',
    descricao: ''
  });

  const abrirModal = (tipo) => {
    setTipoIngresso(tipo);
    setModalAberto(true);
    // Limpa o formulário ao abrir
    setFormData({
      nomeIngresso: '',
      quantidade: '',
      preco: '',
      dataInicio: '',
      dataFim: '',
      descricao: ''
    });
  };

  const fecharModal = () => {
    setModalAberto(false);
    setTipoIngresso(null);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('Dados do ingresso:', { tipo: tipoIngresso, ...formData });
    // Aqui você pode adicionar a lógica para salvar o ingresso
    fecharModal();
  };

  return (
    <>
      <div className="box-05">
        <h3>5. Ingressos</h3>
        <p>Crie o ingresso ideal para o seu evento!</p>

        <div className="buttons-wrapper">
          <button
            type="button"
            className="btn-ingresso"
            onClick={() => abrirModal('pago')}
            aria-label="Adicionar ingresso pago"
          >
            <span className="icon">+</span>
            Ingresso pago
          </button>

          <button
            type="button"
            className="btn-ingresso"
            onClick={() => abrirModal('gratuito')}
            aria-label="Adicionar ingresso gratuito"
          >
            <span className="icon">+</span>
            Ingresso gratuito
          </button>
        </div>
      </div>

      {modalAberto && (
        <div className="modal-overlay" onClick={fecharModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="modal-header">
              <h2 className="modal-title">
                <span className="chevron-icon">›</span>
                <span className={tipoIngresso === 'pago' ? 'tipo-pago' : 'tipo-gratuito'}>
                  Ingresso {tipoIngresso === 'pago' ? 'Pago' : 'Gratuito'}
                </span>
              </h2>
            </div>

            {/* Body */}
            <div className="modal-body">
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="nomeIngresso">Nome do ingresso*</label>
                  <input
                    id="nomeIngresso"
                    type="text"
                    className="input-field"
                    placeholder="Ex: Pista, VIP, Camarote..."
                    value={formData.nomeIngresso}
                    onChange={(e) => handleChange('nomeIngresso', e.target.value)}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="quantidade">Quantidade disponível*</label>
                  <input
                    id="quantidade"
                    type="number"
                    className="input-field"
                    placeholder="Ex: 100"
                    value={formData.quantidade}
                    onChange={(e) => handleChange('quantidade', e.target.value)}
                  />
                </div>
              </div>

              {tipoIngresso === 'pago' && (
                <div className="form-row single">
                  <div className="form-field">
                    <label htmlFor="preco">Preço*</label>
                    <div className="input-with-icon">
                      <div className="input-icon">R$</div>
                      <input
                        id="preco"
                        type="number"
                        step="0.01"
                        className="input-field with-icon"
                        placeholder="0,00"
                        value={formData.preco}
                        onChange={(e) => handleChange('preco', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="dataInicio">Data de início das vendas*</label>
                  <input
                    id="dataInicio"
                    type="date"
                    className="input-field"
                    value={formData.dataInicio}
                    onChange={(e) => handleChange('dataInicio', e.target.value)}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="dataFim">Data de término das vendas*</label>
                  <input
                    id="dataFim"
                    type="date"
                    className="input-field"
                    value={formData.dataFim}
                    onChange={(e) => handleChange('dataFim', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-row single">
                <div className="form-field">
                  <label htmlFor="descricao">Descrição do ingresso</label>
                  <input
                    id="descricao"
                    type="text"
                    className="input-field"
                    placeholder="Informações adicionais sobre o ingresso"
                    value={formData.descricao}
                    onChange={(e) => handleChange('descricao', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn-cancelar"
                onClick={fecharModal}
              >
                <span className="btn-icon">✕</span>
                Cancelar
              </button>

              <button
                type="button"
                className="btn-criar"
                onClick={handleSubmit}
              >
                <span className="btn-icon">✓</span>
                Criar ingresso
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SecaoIngressos;