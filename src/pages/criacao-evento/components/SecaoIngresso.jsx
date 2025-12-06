import React, { useState } from "react";
import "./SecaoIngresso.css";
import { iconsCE } from "../../../utils/iconsCriacaoEvento";

const SecaoIngressos = ({
  ingressos = [],
  onAddIngresso,
  onRemoveIngresso,
}) => {
  const [modalAberto, setModalAberto] = useState(false);
  const [tipoIngresso, setTipoIngresso] = useState(null);
  const [formData, setFormData] = useState({
    tituloIngresso: "",
    quantidade: "",
    dataInicioVendas: "",
    horaInicio: "",
    dataTerminoVendas: "",
    horaTermino: "",
    quantidadeMaxima: "",
    valorReceber: "",
  });

  const abrirModal = (tipo) => {
    setTipoIngresso(tipo);
    setModalAberto(true);
    setFormData({
      tituloIngresso: "",
      quantidade: "",
      dataInicioVendas: "",
      horaInicio: "",
      dataTerminoVendas: "",
      horaTermino: "",
      quantidadeMaxima: "",
      valorReceber: "",
    });
  };

  const fecharModal = () => {
    setModalAberto(false);
    setTipoIngresso(null);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Validações básicas
    if (!formData.tituloIngresso || !formData.quantidade) {
      alert("Preencha o título e a quantidade do ingresso");
      return;
    }

    if (tipoIngresso === "pago" && !formData.valorReceber) {
      alert("Preencha o valor do ingresso pago");
      return;
    }

    // Combina data e hora para criar datetime completo
    const dataInicio =
      formData.dataInicioVendas && formData.horaInicio
        ? `${formData.dataInicioVendas} ${formData.horaInicio}:00`
        : null;

    const dataTermino =
      formData.dataTerminoVendas && formData.horaTermino
        ? `${formData.dataTerminoVendas} ${formData.horaTermino}:00`
        : null;

    // Monta o objeto do ingresso no formato que o backend espera
    const novoIngresso = {
      id: Date.now(), // ID único para controle no frontend
      titulo: formData.tituloIngresso,
      idtipo_ingresso: tipoIngresso === "pago" ? 1 : 2, // 1=Pago, 2=Gratuito
      quantidade: parseInt(formData.quantidade),
      valor_unitario:
        tipoIngresso === "pago" ? parseFloat(formData.valorReceber) : 0,
      data_inicio: dataInicio,
      data_termino: dataTermino,
      max_qtd_por_compra: formData.quantidadeMaxima
        ? parseInt(formData.quantidadeMaxima)
        : parseInt(formData.quantidade),
    };

    console.log("Ingresso criado:", novoIngresso);

    // Notifica o componente pai
    if (onAddIngresso) {
      onAddIngresso(novoIngresso);
    }

    fecharModal();
  };

  const removerIngresso = (id) => {
    if (onRemoveIngresso) {
      onRemoveIngresso(id);
    }
  };

  return (
    <>
      <div className="box-05">
        <h3>5. Ingressos</h3>
        <p>Crie o ingresso ideal para o seu evento!</p>

        {/* Lista de ingressos criados */}
        {ingressos.length > 0 && (
          <div className="ingressos-criados">
            <h4>Ingressos criados ({ingressos.length})</h4>
            {ingressos.map((ingresso) => (
              <div key={ingresso.id} className="ingresso-item">
                <div>
                  <strong>{ingresso.titulo}</strong>
                  <span>
                    {" "}
                    - {ingresso.idtipo_ingresso === 1 ? "Pago" : "Gratuito"}
                  </span>
                  <span> - Qtd: {ingresso.quantidade}</span>
                  {ingresso.idtipo_ingresso === 1 && (
                    <span> - R$ {ingresso.valor_unitario.toFixed(2)}</span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removerIngresso(ingresso.id)}
                  className="btn-remover"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="buttons-wrapper">
          <button
            type="button"
            className="btn-ingresso"
            onClick={() => abrirModal("pago")}
            aria-label="Adicionar ingresso pago"
          >
            <img src={iconsCE.adicionar} alt="Adicionar" className="icon" />
            Ingresso pago
          </button>

          <button
            type="button"
            className="btn-ingresso"
            onClick={() => abrirModal("gratuito")}
            aria-label="Adicionar ingresso gratuito"
          >
            <img src={iconsCE.adicionar} alt="Adicionar" className="icon" />
            Ingresso gratuito
          </button>
        </div>
      </div>

      {modalAberto && (
        <div className="modal-overlay" onClick={fecharModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                <img src={iconsCE.criar} alt="" className="chevron-icon" />
                Criando ingresso{" "}
                <span
                  className={
                    tipoIngresso === "pago" ? "tipo-pago" : "tipo-gratuito"
                  }
                >
                  {tipoIngresso}
                </span>
              </h2>
            </div>

            <div className="modal-body">
              {/* Título e Quantidade */}
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="tituloIngresso">Título do ingresso *</label>
                  <input
                    id="tituloIngresso"
                    type="text"
                    className="input-field"
                    value={formData.tituloIngresso}
                    onChange={(e) =>
                      handleChange("tituloIngresso", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="quantidade">Quantidade *</label>
                  <input
                    id="quantidade"
                    type="number"
                    className="input-field"
                    value={formData.quantidade}
                    onChange={(e) => handleChange("quantidade", e.target.value)}
                    required
                    min="1"
                  />
                </div>
              </div>

              {/* Data e Hora de Início */}
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="dataInicioVendas">
                    Data de início das vendas
                  </label>
                  <div className="input-simples">
                    <div
                      className="icon-area"
                      onClick={() =>
                        document.getElementById("dataInicioVendas").showPicker()
                      }
                    >
                      <img
                        src={iconsCE.checkCalendario}
                        alt="Ícone de calendário"
                      />
                    </div>
                    <input
                      id="dataInicioVendas"
                      type="date"
                      value={formData.dataInicioVendas}
                      onChange={(e) =>
                        handleChange("dataInicioVendas", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="horaInicio">Hora de início</label>
                  <div className="input-simples">
                    <div
                      className="icon-area"
                      onClick={() =>
                        document.getElementById("horaInicio").showPicker()
                      }
                    >
                      <img src={iconsCE.hora} alt="Ícone de relógio" />
                    </div>
                    <input
                      id="horaInicio"
                      type="time"
                      value={formData.horaInicio}
                      onChange={(e) =>
                        handleChange("horaInicio", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Data e Hora de Término */}
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="dataTerminoVendas">
                    Data de término das vendas
                  </label>
                  <div className="input-simples">
                    <div
                      className="icon-area"
                      onClick={() =>
                        document
                          .getElementById("dataTerminoVendas")
                          .showPicker()
                      }
                    >
                      <img
                        src={iconsCE.checkCalendario}
                        alt="Ícone de calendário"
                      />
                    </div>
                    <input
                      id="dataTerminoVendas"
                      type="date"
                      value={formData.dataTerminoVendas}
                      onChange={(e) =>
                        handleChange("dataTerminoVendas", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="horaTermino">Hora de término</label>
                  <div className="input-simples">
                    <div
                      className="icon-area"
                      onClick={() =>
                        document.getElementById("horaTermino").showPicker()
                      }
                    >
                      <img src={iconsCE.hora} alt="Ícone de relógio" />
                    </div>
                    <input
                      id="horaTermino"
                      type="time"
                      value={formData.horaTermino}
                      onChange={(e) =>
                        handleChange("horaTermino", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Quantidade Máxima */}
              <div className="form-row single">
                <div className="form-field">
                  <label htmlFor="quantidadeMaxima">
                    Quantidade máxima permitida por compra
                  </label>
                  <input
                    id="quantidadeMaxima"
                    type="number"
                    className="input-field"
                    value={formData.quantidadeMaxima}
                    onChange={(e) =>
                      handleChange("quantidadeMaxima", e.target.value)
                    }
                    min="1"
                  />
                </div>
              </div>

              {/* Valor a receber (apenas para pago) */}
              {tipoIngresso === "pago" && (
                <div className="form-row single">
                  <div className="form-field">
                    <label htmlFor="valorReceber">Valor a receber *</label>
                    <input
                      id="valorReceber"
                      type="number"
                      step="0.01"
                      className="input-field"
                      value={formData.valorReceber}
                      onChange={(e) =>
                        handleChange("valorReceber", e.target.value)
                      }
                      required
                      min="0.01"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn-cancelar"
                onClick={fecharModal}
              >
                <img src={iconsCE.seta} alt="Voltar" className="btn-icon" />
                Cancelar
              </button>

              <button
                type="button"
                className="btn-criar"
                onClick={handleSubmit}
              >
                <img src={iconsCE.ingresso} alt="Criar" className="btn-icon" />
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
