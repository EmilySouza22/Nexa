import React, { useState } from 'react';
import './CriacaoEvento.css';
import InformacoesBasicas from './components/InformacaoBasicas';
import DataHorario from './components/DataHorario';
import DescricaoEvento from './components/DescricaoEvento';
import LocalEvento from './components/LocalEvento';
import SecaoIngressos from './components/SecaoIngresso';
import Responsabilidades from './components/Responsabilidades';
import BotaoPublicar from './components/BotaoPublicar';

function CriacaoEvento() {
  const [formData, setFormData] = useState({
    nameEvent: '',
    category: '',
    image: null,
    preview: null,
    classification: '',
    dateInicio: '',
    timeInicio: '',
    dateTermino: '',
    timeTermino: '',
    descricao: '',
    localEvento: '',
    estado: '',
    avenidaRua: '',
    cidade: '',
    complemento: '',
    cep: '',
    bairro: '',
    numero: '',
    aceitaTermos: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, image: 'Por favor, selecione apenas arquivos de imagem' }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'A imagem deve ter no máximo 5MB' }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: file, preview: reader.result }));
      };
      reader.readAsDataURL(file);
      setErrors(prev => ({ ...prev, image: '' }));
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, image: null, preview: null }));
  };

  const formatCEP = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 5) return numbers;
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
  };

  const handleCEPChange = (field, value) => {
    handleChange(field, formatCEP(value));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nameEvent.trim()) newErrors.nameEvent = 'Nome do evento é obrigatório';
    if (!formData.category) newErrors.category = 'Selecione uma categoria';
    if (!formData.image) newErrors.image = 'Imagem de divulgação é obrigatória';
    if (!formData.classification) newErrors.classification = 'Selecione uma classificação indicativa';
    if (!formData.dateInicio) newErrors.dateInicio = 'Data de início é obrigatória';
    if (!formData.timeInicio) newErrors.timeInicio = 'Hora de início é obrigatória';
    if (!formData.dateTermino) newErrors.dateTermino = 'Data de término é obrigatória';
    if (!formData.timeTermino) newErrors.timeTermino = 'Hora de término é obrigatória';
    if (!formData.descricao.trim()) newErrors.descricao = 'Descrição do evento é obrigatória';
    else if (formData.descricao.trim().length < 50) newErrors.descricao = 'A descrição deve ter pelo menos 50 caracteres';
    if (!formData.localEvento.trim()) newErrors.localEvento = 'Informe o local do evento';
    if (!formData.avenidaRua.trim()) newErrors.avenidaRua = 'Avenida/Rua é obrigatória';
    if (!formData.estado) newErrors.estado = 'Selecione um estado';
    if (!formData.cidade.trim()) newErrors.cidade = 'Cidade é obrigatória';
    if (!formData.bairro.trim()) newErrors.bairro = 'Bairro é obrigatório';
    if (!formData.aceitaTermos) newErrors.aceitaTermos = 'Você deve aceitar os termos para publicar o evento';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      console.log('Dados do evento:', formData);
      alert('Evento publicado com sucesso!');
    } catch (error) {
      console.error('Erro ao publicar evento:', error);
      alert('Erro ao publicar evento. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-criacao-evento">
      <InformacoesBasicas
        formData={formData}
        errors={errors}
        onChange={handleChange}
        onImageChange={handleImageChange}
        onImageRemove={handleRemoveImage}
      />

      <DataHorario
        formData={formData}
        errors={errors}
        onChange={handleChange}
      />

      <DescricaoEvento
        descricao={formData.descricao}
        onChange={(e) => handleChange('descricao', e.target.value)}
        error={errors.descricao}
      />

      <LocalEvento
        formData={formData}
        errors={errors}
        onChange={(field, value) => field === 'cep' ? handleCEPChange(field, value) : handleChange(field, value)}
      />

      <SecaoIngressos />

      <Responsabilidades
        aceitaTermos={formData.aceitaTermos}
        onChange={(e) => handleChange('aceitaTermos', e.target.checked)}
        error={errors.aceitaTermos}
      />

      <BotaoPublicar
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default CriacaoEvento;
