import React, { useState } from "react";
import "./SecaoIngresso.css";
import { iconsCE } from "../../../utils/icons";

const SecaoIngressos = ({
  ingressos = [],
  onAddIngresso,
  onRemoveIngresso,
  onEditIngresso,
}) => {
  const [modalAberto, setModalAberto] = useState(false);
  const [tipoIngresso, setTipoIngresso] = useState(null);
  const [ingressoEditando, setIngressoEditando] = useState(null);
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

  const abrirModal = (tipo, ingresso = null) => {
    setTipoIngresso(tipo);
    setIngressoEditando(ingresso);
    setModalAberto(true);

    if (ingresso) {
      // Preenche o formulário com dados do ingresso existente
      const [dataTermino, horaTermino] = ingresso.data_termino
        ? ingresso.data_termino.split(" ")
        : ["", ""];
      
      setFormData({
        tituloIngresso: ingresso.titulo,
        quantidade: ingresso.quantidade.toString(),
        dataInicioVendas: "",
        horaInicio: "",
        dataTerminoVendas: dataTermino,
        horaTermino: horaTermino.substring(0, 5), // Remove os segundos
        quantidadeMaxima: ingresso.max_qtd_por_compra?.toString() || "",
        valorReceber: ingresso.valor_unitario?.toString() || "",
      });
    } else {
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
    }
  };

  const fecharModal = () => {
    setModalAberto(false);
    setTipoIngresso(null);
    setIngressoEditando(null);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.tituloIngresso || !formData.quantidade) {
      alert("Preencha o título e a quantidade do ingresso");
      return;
    }

    if (tipoIngresso === "pago" && !formData.valorReceber) {
      alert("Preencha o valor do ingresso pago");
      return;
    }

    const dataInicio =
      formData.dataInicioVendas && formData.horaInicio
        ? `${formData.dataInicioVendas} ${formData.horaInicio}:00`
        : null;

    const dataTermino =
      formData.dataTerminoVendas && formData.horaTermino
        ? `${formData.dataTerminoVendas} ${formData.horaTermino}:00`
        : null;

    const ingressoData = {
      id: ingressoEditando ? ingressoEditando.id : Date.now(),
      titulo: formData.tituloIngresso,
      idtipo_ingresso: tipoIngresso === "pago" ? 1 : 2,
      quantidade: parseInt(formData.quantidade),
      valor_unitario:
        tipoIngresso === "pago" ? parseFloat(formData.valorReceber) : 0,
      data_inicio: dataInicio,
      data_termino: dataTermino,
      max_qtd_por_compra: formData.quantidadeMaxima
        ? parseInt(formData.quantidadeMaxima)
        : parseInt(formData.quantidade),
      vendidos: ingressoEditando ? ingressoEditando.vendidos : 0,
    };

    if (ingressoEditando && onEditIngresso) {
      onEditIngresso(ingressoData);
    } else if (onAddIngresso) {
      onAddIngresso(ingressoData);
    }

    fecharModal();
  };

  const removerIngresso = (id) => {
    if (onRemoveIngresso) {
      onRemoveIngresso(id);
    }
  };

  const formatarData = (dataCompleta) => {
    if (!dataCompleta) return "-";
    const [data] = dataCompleta.split(" ");
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
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

        {/* Tabela de ingressos criados */}
        {ingressos.length > 0 && (
          <div className="ingressos-criados-tabela">
            <h4>Ingressos criados:</h4>
            <table className="tabela-ingressos">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Vendidos/Total</th>
                  <th>Data de término da venda</th>
                  <th>Valor a receber</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {ingressos.map((ingresso) => (
                  <tr key={ingresso.id}>
                    <td>{ingresso.titulo}</td>
                    <td>
                      <div className="vendidos-total">
                        <span className="vendidos">
                          {ingresso.vendidos || 0}
                        </span>
                        <span className="separador">/</span>
                        <span className="total">{ingresso.quantidade}</span>
                      </div>
                    </td>
                    <td>{formatarData(ingresso.data_termino)}</td>
                    <td>
                      {ingresso.idtipo_ingresso === 1
                        ? `R$${ingresso.valor_unitario.toFixed(2)}`
                        : "-"}
                    </td>
                    <td>
                      <div className="acoes-tabela">
                        <button
                          type="button"
                          className="btn-editar"
                          onClick={() =>
                            abrirModal(
                              ingresso.idtipo_ingresso === 1
                                ? "pago"
                                : "gratuito",
                              ingresso
                            )
                          }
                          title="Editar ingresso"
                        >
                          <img src={iconsCE.editar} alt="Editar" />
                        </button>
                        <button
                          type="button"
                          className="btn-excluir-tabela"
                          onClick={() => removerIngresso(ingresso.id)}
                          title="Excluir ingresso"
                        >
                          <img src={iconsCE.deletar} alt="Excluir" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modalAberto && (
        <div className="modal-overlay" onClick={fecharModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                <img src={iconsCE.criar} alt="" className="chevron-icon" />
                {ingressoEditando ? "Editando" : "Criando"} ingresso{" "}
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
                {ingressoEditando ? "Salvar alterações" : "Criar ingresso"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SecaoIngressos;