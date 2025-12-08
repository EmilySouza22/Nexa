import React, { useState } from 'react';
import './CriacaoEvento.css';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import InformacoesBasicas from './components/InformacaoBasicas';
import DataHorario from './components/DataHorario';
import DescricaoEvento from './components/DescricaoEvento';
import LocalEvento from './components/LocalEvento';
import SecaoIngressos from './components/SecaoIngresso';
import Responsabilidades from './components/Responsabilidades';
import BotaoPublicar from './components/BotaoPublicar';
import toastr from '../../utils/toastr';
import Footer from '../../components/Footer';
function CriacaoEvento() {
	const userName = sessionStorage.getItem('userName') || 'Organizador';
	const userInitials = sessionStorage.getItem('userInitials') || 'OR';

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
		ingressos: [],
	});

	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [buscandoCep, setBuscandoCep] = useState(false);
	const [erroCep, setErroCep] = useState('');

	const handleChange = (field, value) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		if (errors[field]) {
			setErrors((prev) => ({ ...prev, [field]: '' }));
		}
	};

	const handleAddIngresso = (ingresso) => {
		setFormData((prev) => ({
			...prev,
			ingressos: [...prev.ingressos, ingresso],
		}));
		if (errors.ingressos) {
			setErrors((prev) => ({ ...prev, ingressos: '' }));
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
			if (!file.type.startsWith('image/')) {
				setErrors((prev) => ({
					...prev,
					image: 'Por favor, selecione apenas arquivos de imagem',
				}));
				return;
			}
			if (file.size > 5 * 1024 * 1024) {
				setErrors((prev) => ({
					...prev,
					image: 'A imagem deve ter no máximo 5MB',
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
			setErrors((prev) => ({ ...prev, image: '' }));
		}
	};

	const handleRemoveImage = () => {
		setFormData((prev) => ({ ...prev, image: null, preview: null }));
	};

	const formatCEP = (value) => {
		const numbers = value.replace(/\D/g, '');
		if (numbers.length <= 5) return numbers;
		return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
	};

	const buscarCep = async (cep) => {
		const cepLimpo = cep.replace(/\D/g, '');

		if (cepLimpo.length !== 8) {
			return;
		}

		setBuscandoCep(true);
		setErroCep('');

		try {
			const response = await fetch(
				`https://viacep.com.br/ws/${cepLimpo}/json/`
			);
			const data = await response.json();

			if (data.erro) {
				setErroCep('CEP não encontrado');
				setBuscandoCep(false);
				return;
			}

			// Preenche os campos automaticamente
			setFormData((prev) => ({
				...prev,
				avenidaRua: data.logradouro || prev.avenidaRua,
				bairro: data.bairro || prev.bairro,
				cidade: data.localidade || prev.cidade,
				estado: data.uf || prev.estado,
				complemento: data.complemento || prev.complemento,
			}));

			// Limpa erros dos campos preenchidos
			setErrors((prev) => ({
				...prev,
				avenidaRua: '',
				bairro: '',
				cidade: '',
				estado: '',
			}));

			setBuscandoCep(false);
		} catch (error) {
			setErroCep('Erro ao buscar CEP');
			setBuscandoCep(false);
		}
	};

	const handleCEPChange = (field, value) => {
		const cepFormatado = formatCEP(value);
		handleChange(field, cepFormatado);

		const cepLimpo = cepFormatado.replace(/\D/g, '');
		if (cepLimpo.length === 8) {
			buscarCep(cepFormatado);
		} else {
			setErroCep('');
		}
	};

	const validateForm = () => {
		const newErrors = {};

		if (!formData.nameEvent.trim())
			newErrors.nameEvent = 'Nome do evento é obrigatório';
		if (!formData.category) newErrors.category = 'Selecione uma categoria';
		if (!formData.image) newErrors.image = 'Imagem de divulgação é obrigatória';
		if (!formData.classification)
			newErrors.classification = 'Selecione uma classificação indicativa';
		if (!formData.dateInicio)
			newErrors.dateInicio = 'Data de início é obrigatória';
		if (!formData.timeInicio)
			newErrors.timeInicio = 'Hora de início é obrigatória';
		if (!formData.dateTermino)
			newErrors.dateTermino = 'Data de término é obrigatória';
		if (!formData.timeTermino)
			newErrors.timeTermino = 'Hora de término é obrigatória';
		if (!formData.descricao.trim())
			newErrors.descricao = 'Descrição do evento é obrigatória';
		else if (formData.descricao.trim().length < 50)
			newErrors.descricao = 'A descrição deve ter pelo menos 50 caracteres';
		if (!formData.localEvento.trim())
			newErrors.localEvento = 'Informe o local do evento';
		if (!formData.avenidaRua.trim())
			newErrors.avenidaRua = 'Avenida/Rua é obrigatória';
		if (!formData.estado) newErrors.estado = 'Selecione um estado';
		if (!formData.cidade.trim()) newErrors.cidade = 'Cidade é obrigatória';
		if (!formData.bairro.trim()) newErrors.bairro = 'Bairro é obrigatório';

		if (formData.ingressos.length === 0)
			newErrors.ingressos = 'Adicione pelo menos um ingresso';

		if (!formData.aceitaTermos)
			newErrors.aceitaTermos =
				'Você deve aceitar os termos para publicar o evento';

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async () => {
		if (!validateForm()) {
			toastr.info('Por favor, preencha todos os campos obrigatórios');
			return;
		}

		setIsSubmitting(true);
		try {
			const userId = sessionStorage.getItem('userId');
			const userIdInt = sessionStorage.getItem('userIdInt');
			const idconta = sessionStorage.getItem('idconta');

			const possibleIds = [userId, userIdInt, idconta];
			const validId = possibleIds.find(
				(id) => id && id !== 'null' && id !== 'undefined'
			);

			if (!validId) {
				toastr.error(
					'Você precisa estar logado para criar um evento! Por favor, faça login novamente.'
				);
				setIsSubmitting(false);
				return;
			}

			const idcontaInt = parseInt(validId);

			if (isNaN(idcontaInt)) {
				toastr.error(
					'ID de usuário inválido! Por favor, faça login novamente.'
				);

				setIsSubmitting(false);
				return;
			}

			if (!formData.preview) {
				toastr.error(
					'Imagem não foi carregada corretamente. Por favor, selecione a imagem novamente.'
				);
				setIsSubmitting(false);
				return;
			}

			const eventoData = {
				nome: formData.nameEvent,
				idcategoria_evento: parseInt(formData.category),
				assunto_principal: formData.descricao,
				classificacao: formData.classification,
				data_inicio: `${formData.dateInicio} ${formData.timeInicio}:00`,
				data_termino: `${formData.dateTermino} ${formData.timeTermino}:00`,
				idconta: idcontaInt,
				imagem: formData.preview,
				endereco: {
					local: formData.localEvento,
					rua: formData.avenidaRua,
					complemento: formData.complemento || '',
					bairro: formData.bairro,
					cidade: formData.cidade,
					estado: formData.estado,
					cep: formData.cep,
					numero: formData.numero || '',
				},
				ingressos: formData.ingressos.map((ing) => ({
					titulo: ing.titulo,
					idtipo_ingresso: ing.idtipo_ingresso,
					quantidade: ing.quantidade,
					valor_unitario: ing.valor_unitario,
					data_inicio: ing.data_inicio,
					data_termino: ing.data_termino,
					max_qtd_por_compra: ing.max_qtd_por_compra,
				})),
			};

			const response = await fetch('http://localhost:3000/api/eventos/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(eventoData),
			});

			// Verifica se o erro é 413 (Payload Too Large)
			if (response.status === 413) {
				throw new Error(
					'A imagem é muito pesada! Por favor, escolha uma imagem menor'
				);
			}

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || 'Erro ao criar evento');
			}

			toastr.success('Evento publicado com sucesso!');

			// Limpar formulário após sucesso
			setFormData({
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
				ingressos: [],
			});
		} catch (error) {
			console.error('Erro completo:', error);
			toastr.error(`Erro ao publicar evento: ${error.message}`);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="criacao-evento-page">
			<Navbar userName={userName} userInitials={userInitials} />
			<div className="criacao-evento-layout">
				<Sidebar userType="organizador" />
				<main className="criacao-evento-content">
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
							onChange={(field, value) =>
								field === 'cep'
									? handleCEPChange(field, value)
									: handleChange(field, value)
							}
							buscandoCep={buscandoCep}
							erroCep={erroCep}
						/>

						<SecaoIngressos
							ingressos={formData.ingressos}
							onAddIngresso={handleAddIngresso}
							onRemoveIngresso={handleRemoveIngresso}
						/>
						{errors.ingressos && (
							<span
								className="error-message"
								style={{
									color: 'red',
									marginTop: '-15px',
									marginBottom: '15px',
									display: 'block',
								}}
							>
								{errors.ingressos}
							</span>
						)}

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
				</main>
			</div>
			<Footer />
		</div>
	);
}

export default CriacaoEvento;
