import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EdicaoEvento.css";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import InformacoesEdicao from "./components/InformacoesEdicao";
import DataHorarioEdicao from "./components/DataHorarioEdicao";
import DescricaoEdicao from "./components/DescricaoEdicao";
import LocalEdicao from "./components/LocalEdicao";
import IngressoEdicao from "./components/IngressoEdicao";
import ResponsabilidadesEd from "./components/ResponsabilidadesEd";
import BotaoEdicao from "./components/BotaoEdicao";

function EdicaoEvento() {
  const { idevento } = useParams();
  const navigate = useNavigate();
  const userName = sessionStorage.getItem("userName") || "Organizador";
  const userInitials = sessionStorage.getItem("userInitials") || "OR";

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nameEvent: "",
    category: "",
    image: null,
    preview: null,
    classification: "",
    dateInicio: "",
    timeInicio: "",
    dateTermino: "",
    timeTermino: "",
    descricao: "",
    localEvento: "",
    estado: "",
    avenidaRua: "",
    cidade: "",
    complemento: "",
    cep: "",
    bairro: "",
    numero: "",
    aceitaTermos: true,
    ingressos: [],
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [buscandoCep, setBuscandoCep] = useState(false);
  const [erroCep, setErroCep] = useState("");

  useEffect(() => {
    const carregarEvento = async () => {
      if (!idevento) {
        setLoading(false);
        return;
      }

      try {
        const responseEvento = await fetch(
          `http://localhost:3000/api/eventos/detalhes/${idevento}`
        );

        if (!responseEvento.ok) {
          throw new Error("Evento não encontrado");
        }

        const evento = await responseEvento.json();

        const responseIngressos = await fetch(
          `http://localhost:3000/api/eventos/detalhes/${idevento}/ingressos`
        );

        const dataIngressos = await responseIngressos.json();

        const [dataInicio, horaInicio] = evento.data_inicio
          ? evento.data_inicio.split(" ")
          : ["", ""];

        const [dataTermino, horaTermino] = evento.data_termino
          ? evento.data_termino.split(" ")
          : ["", ""];

        const categoriaMap = {
          "Festa": "1",
          "Teatros": "2",
          "Infantil": "3",
          "Shows": "4",
          "Stand Up": "5",
          "Esportivos": "6",
          "Workshops": "7",
          "Online": "8",
          "Gastronomia": "9",
        };

        const ingressosFormatados = dataIngressos.ingressos.map((ing) => ({
          id: ing.idingresso,
          titulo: ing.titulo,
          idtipo_ingresso: ing.tipo_ingressoid,
          quantidade: ing.quantidade,
          valor_unitario: ing.valor_unitario,
          data_inicio: ing.data_inicio,
          data_termino: ing.data_termino,
          max_qtd_por_compra: ing.max_qtd_por_compra,
        }));

        setFormData({
          nameEvent: evento.nome || "",
          category: categoriaMap[evento.nome_categoria] || "",
          image: null,
          preview: evento.imagem || null,
          classification: evento.classificacao || "",
          dateInicio: dataInicio || "",
          timeInicio: horaInicio ? horaInicio.substring(0, 5) : "",
          dateTermino: dataTermino || "",
          timeTermino: horaTermino ? horaTermino.substring(0, 5) : "",
          descricao: evento.assunto_principal || "",
          localEvento: evento.local || "",
          estado: evento.estado || "",
          avenidaRua: evento.rua || "",
          cidade: evento.cidade || "",
          complemento: evento.complemento || "",
          cep: evento.cep || "",
          bairro: evento.bairro || "",
          numero: evento.numero || "",
          aceitaTermos: true,
          ingressos: ingressosFormatados,
        });

        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar evento:", error);
        alert("❌ Erro ao carregar evento: " + error.message);
        navigate("/meus-eventos");
      }
    };

    carregarEvento();
  }, [idevento, navigate]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleAddIngresso = (ingresso) => {
    setFormData((prev) => ({
      ...prev,
      ingressos: [...prev.ingressos, ingresso],
    }));
    if (errors.ingressos) {
      setErrors((prev) => ({ ...prev, ingressos: "" }));
    }
  };

  const handleRemoveIngresso = (id) => {
    setFormData((prev) => ({
      ...prev,
      ingressos: prev.ingressos.filter((ing) => ing.id !== id),
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: file,
          preview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
      preview: null,
    }));
  };

  const handleCEPChange = async (field, value) => {
    const cepFormatado = value.replace(/\D/g, "").replace(/(\d{5})(\d+)/, "$1-$2");
    handleChange(field, cepFormatado);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nameEvent.trim())
      newErrors.nameEvent = "Nome do evento é obrigatório";
    if (!formData.category)
      newErrors.category = "Selecione uma categoria";

    if (!formData.descricao.trim())
      newErrors.descricao = "Descrição do evento é obrigatória";

    if (formData.ingressos.length === 0)
      newErrors.ingressos = "Adicione pelo menos um ingresso";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    alert("Evento salvo!");
  };

  if (loading) {
    return (
      <div className="criacao-evento-page">
        <Navbar userName={userName} userInitials={userInitials} />
        <div className="criacao-evento-layout">
          <Sidebar userType="organizador" />
          <main className="criacao-evento-content">
            <div className="loading-overlay">
              <div className="loading-spinner"></div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="criacao-evento-page">
      <Navbar userName={userName} userInitials={userInitials} />

      <div className="criacao-evento-layout">
        <Sidebar userType="organizador" />

        <main className="criacao-evento-content">
          <div className="container-criacao-evento">

            {/* 🔥 AQUI o header com "Editar Evento" foi removido */}

            <InformacoesEdicao
              formData={formData}
              errors={errors}
              onChange={handleChange}
              onImageChange={handleImageChange}
              onImageRemove={handleRemoveImage}
            />

            <DataHorarioEdicao
              formData={formData}
              errors={errors}
              onChange={handleChange}
            />

            <DescricaoEdicao
              descricao={formData.descricao}
              onChange={(e) => handleChange("descricao", e.target.value)}
              error={errors.descricao}
            />

            <LocalEdicao
              formData={formData}
              errors={errors}
              onChange={(field, value) =>
                field === "cep"
                  ? handleCEPChange(field, value)
                  : handleChange(field, value)
              }
            />

            <IngressoEdicao
              ingressos={formData.ingressos}
              onAddIngresso={handleAddIngresso}
              onRemoveIngresso={handleRemoveIngresso}
            />

            {errors.ingressos && (
              <span className="error-message">{errors.ingressos}</span>
            )}

            <ResponsabilidadesEd
              aceitaTermos={formData.aceitaTermos}
              onChange={(e) => handleChange("aceitaTermos", e.target.checked)}
              error={errors.aceitaTermos}
            />

            <BotaoEdicao
              isSubmitting={isSubmitting}
              onSubmit={handleSubmit}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default EdicaoEvento;
