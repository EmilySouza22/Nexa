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
import Responsabilidades from "./components/Responsabilidades";
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

  // BUSCAR DADOS DO EVENTO AO CARREGAR
  useEffect(() => {
    const carregarEvento = async () => {
      try {
        const responseEvento = await fetch(
          `http://localhost:3000/api/eventos/${idevento}`
        );
        
        if (!responseEvento.ok) {
          throw new Error("Evento não encontrado");
        }

        const evento = await responseEvento.json();

        const responseIngressos = await fetch(
          `http://localhost:3000/api/eventos/${idevento}/ingressos`
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
          idtipo_ingresso: ing.idtipo_ingresso,
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
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          image: "Por favor, selecione apenas arquivos de imagem",
        }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          image: "A imagem deve ter no máximo 5MB",
        }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: file,
          preview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
      setErrors((prev) => ({ ...prev, image: "" }));
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: null, preview: null }));
  };

  const formatCEP = (value) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 5) return numbers;
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
  };

  const buscarCep = async (cep) => {
    const cepLimpo = cep.replace(/\D/g, "");

    if (cepLimpo.length !== 8) {
      return;
    }

    setBuscandoCep(true);
    setErroCep("");

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cepLimpo}/json/`
      );
      const data = await response.json();

      if (data.erro) {
        setErroCep("CEP não encontrado");
        setBuscandoCep(false);
        return;
      }

      setFormData((prev) => ({
        ...prev,
        avenidaRua: data.logradouro || prev.avenidaRua,
        bairro: data.bairro || prev.bairro,
        cidade: data.localidade || prev.cidade,
        estado: data.uf || prev.estado,
        complemento: data.complemento || prev.complemento,
      }));

      setErrors((prev) => ({
        ...prev,
        avenidaRua: "",
        bairro: "",
        cidade: "",
        estado: "",
      }));

      setBuscandoCep(false);
    } catch (error) {
      setErroCep("Erro ao buscar CEP");
      setBuscandoCep(false);
    }
  };

  const handleCEPChange = (field, value) => {
    const cepFormatado = formatCEP(value);
    handleChange(field, cepFormatado);

    const cepLimpo = cepFormatado.replace(/\D/g, "");
    if (cepLimpo.length === 8) {
      buscarCep(cepFormatado);
    } else {
      setErroCep("");
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nameEvent.trim())
      newErrors.nameEvent = "Nome do evento é obrigatório";
    if (!formData.category) newErrors.category = "Selecione uma categoria";
    if (!formData.classification)
      newErrors.classification = "Selecione uma classificação indicativa";
    if (!formData.dateInicio)
      newErrors.dateInicio = "Data de início é obrigatória";
    if (!formData.timeInicio)
      newErrors.timeInicio = "Hora de início é obrigatória";
    if (!formData.dateTermino)
      newErrors.dateTermino = "Data de término é obrigatória";
    if (!formData.timeTermino)
      newErrors.timeTermino = "Hora de término é obrigatória";
    if (!formData.descricao.trim())
      newErrors.descricao = "Descrição do evento é obrigatória";
    else if (formData.descricao.trim().length < 50)
      newErrors.descricao = "A descrição deve ter pelo menos 50 caracteres";
    if (!formData.localEvento.trim())
      newErrors.localEvento = "Informe o local do evento";
    if (!formData.avenidaRua.trim())
      newErrors.avenidaRua = "Avenida/Rua é obrigatória";
    if (!formData.estado) newErrors.estado = "Selecione um estado";
    if (!formData.cidade.trim()) newErrors.cidade = "Cidade é obrigatória";
    if (!formData.bairro.trim()) newErrors.bairro = "Bairro é obrigatório";

    if (formData.ingressos.length === 0)
      newErrors.ingressos = "Adicione pelo menos um ingresso";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      alert("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    setIsSubmitting(true);
    try {
      const userId = sessionStorage.getItem("userId");
      const userIdInt = sessionStorage.getItem("userIdInt");
      const idconta = sessionStorage.getItem("idconta");

      const possibleIds = [userId, userIdInt, idconta];
      const validId = possibleIds.find(
        (id) => id && id !== "null" && id !== "undefined"
      );

      if (!validId) {
        alert(
          "❌ Você precisa estar logado para editar um evento!\n\nPor favor, faça login novamente."
        );
        setIsSubmitting(false);
        return;
      }

      const idcontaInt = parseInt(validId);

      if (isNaN(idcontaInt)) {
        alert("❌ ID de usuário inválido! Por favor, faça login novamente.");
        setIsSubmitting(false);
        return;
      }

      const imagemFinal = formData.image ? formData.preview : formData.preview;

      const eventoData = {
        nome: formData.nameEvent,
        idcategoria_evento: parseInt(formData.category),
        assunto_principal: formData.descricao,
        classificacao: formData.classification,
        data_inicio: `${formData.dateInicio} ${formData.timeInicio}:00`,
        data_termino: `${formData.dateTermino} ${formData.timeTermino}:00`,
        idconta: idcontaInt,
        imagem: imagemFinal,
        endereco: {
          local: formData.localEvento,
          rua: formData.avenidaRua,
          complemento: formData.complemento || "",
          bairro: formData.bairro,
          cidade: formData.cidade,
          estado: formData.estado,
          cep: formData.cep,
          numero: formData.numero || "",
        },
        ingressos: formData.ingressos.map((ing) => ({
          idingresso: ing.id,
          titulo: ing.titulo,
          idtipo_ingresso: ing.idtipo_ingresso,
          quantidade: ing.quantidade,
          valor_unitario: ing.valor_unitario,
          data_inicio: ing.data_inicio,
          data_termino: ing.data_termino,
          max_qtd_por_compra: ing.max_qtd_por_compra,
        })),
      };

      const response = await fetch(
        `http://localhost:3000/api/eventos/${idevento}/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventoData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao atualizar evento");
      }

      alert("✅ Evento atualizado com sucesso!");
      navigate("/meus-eventos");
    } catch (error) {
      console.error("Erro completo:", error);
      alert(`❌ Erro ao atualizar evento: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
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
            <div className="header-edicao-evento">
              <h1 className="titulo-principal-edicao">Informações do evento</h1>
            </div>

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
              buscandoCep={buscandoCep}
              erroCep={erroCep}
            />

            <IngressoEdicao
              ingressos={formData.ingressos}
              onAddIngresso={handleAddIngresso}
              onRemoveIngresso={handleRemoveIngresso}
              isEdicao={true}
            />
            {errors.ingressos && (
              <span
                className="error-message"
                style={{
                  color: "red",
                  marginTop: "-15px",
                  marginBottom: "15px",
                  display: "block",
                }}
              >
                {errors.ingressos}
              </span>
            )}

            <Responsabilidades
              aceitaTermos={formData.aceitaTermos}
              onChange={(e) => handleChange("aceitaTermos", e.target.checked)}
              error={errors.aceitaTermos}
              isEdicao={true}
            />

            <BotaoEdicao
              isSubmitting={isSubmitting}
              onSubmit={handleSubmit}
              isEdicao={true}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default EdicaoEvento;