import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EventoConvidado.css';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import CardEventoOgz from './components/CardEventoOgz';
import DetalhesEvento from './components/DetalhesEvento';
import SobreOrganizador from './components/SobreOrganizador';

function EventoConvidado() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [evento, setEvento] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (id) {
			buscarEvento();
		}
	}, [id]);

	const buscarEvento = async () => {
		try {
			setLoading(true);
			setError(null);

			console.log(' Buscando evento ID:', id);

			const response = await fetch(
				`http://localhost:3000/api/eventos/view/${id}`
			);

			if (!response.ok) {
				throw new Error(`Erro HTTP: ${response.status}`);
			}

			const data = await response.json();
			console.log(' Resposta da API:', data);

			if (!data.success) {
				throw new Error(data.message || 'Erro ao buscar evento');
			}

			const eventoFormatado = transformarDadosEvento(data.data);
			console.log(' Evento formatado:', eventoFormatado);

			setEvento(eventoFormatado);
		} catch (err) {
			console.error('Erro ao buscar evento:', err);
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	// FUNÇÃO PARA FORMATAR IMAGEM BASE64
	const formatarImagemBase64 = (imagemBase64) => {
		if (!imagemBase64) return null;

		if (imagemBase64.startsWith('data:image')) {
			return imagemBase64;
		}

		if (imagemBase64.startsWith('http')) {
			return imagemBase64;
		}

		if (imagemBase64.startsWith('/9j/')) {
			return `data:image/jpeg;base64,${imagemBase64}`;
		} else if (imagemBase64.startsWith('iVBOR')) {
			return `data:image/png;base64,${imagemBase64}`;
		} else if (imagemBase64.startsWith('R0lGOD')) {
			return `data:image/gif;base64,${imagemBase64}`;
		}

		return `data:image/jpeg;base64,${imagemBase64}`;
	};

	// FUNÇÃO PARA FORMATAR DIA DA SEMANA + HORÁRIO
	const formatarDiaSemanaHorario = (dataInicio, dataTermino) => {
		const inicio = new Date(dataInicio);
		const termino = new Date(dataTermino);

		// Mapear dias da semana
		const diasSemana = [
			'Domingo',
			'Segunda',
			'Terça',
			'Quarta',
			'Quinta',
			'Sexta',
			'Sábado',
		];

		// Pegar dia da semana de início e término
		const diaInicio = diasSemana[inicio.getDay()];
		const diaTermino = diasSemana[termino.getDay()];

		// Formatar horas
		const horaInicio = inicio.toLocaleTimeString('pt-BR', {
			hour: '2-digit',
			minute: '2-digit',
		});

		const horaTermino = termino.toLocaleTimeString('pt-BR', {
			hour: '2-digit',
			minute: '2-digit',
		});

		// Se for o mesmo dia
		if (diaInicio === diaTermino) {
			return `${diaInicio} às ${horaInicio}`;
		}

		// Se for dias diferentes
		// Exemplo: "Quinta, Sexta às 20h00, Sábado às 16h00, Domingo às 15h00"
		return `${diaInicio} às ${horaInicio}, ${diaTermino} às ${horaTermino}`;
	};

	// Função para transformar dados do banco para o formato dos componentes
	const transformarDadosEvento = (dadosBanco) => {
		try {
			// Formatar datas
			const dataInicio = new Date(dadosBanco.data_inicio);
			const dataTermino = new Date(dadosBanco.data_termino);

			const formatarData = (data) => {
				return data.toLocaleDateString('pt-BR', {
					day: '2-digit',
					month: 'long',
					year: 'numeric',
				});
			};

			const formatarHora = (data) => {
				return data.toLocaleTimeString('pt-BR', {
					hour: '2-digit',
					minute: '2-digit',
				});
			};

			// Montar o endereço completo
			const enderecoCompleto = [
				dadosBanco.rua,
				dadosBanco.numero,
				dadosBanco.bairro,
				dadosBanco.cidade,
				dadosBanco.estado,
			]
				.filter(Boolean)
				.join(', ');

			const enderecoComCEP = dadosBanco.cep
				? `${enderecoCompleto} - CEP: ${dadosBanco.cep}`
				: enderecoCompleto;

			//  PROCESSAR IMAGEM COM FORMATAÇÃO
			const imagemFormatada = formatarImagemBase64(dadosBanco.imagem);

			return {
				// Dados básicos
				id: dadosBanco.idevento,
				nome: dadosBanco.nome,
				bannerUrl:
					imagemFormatada ||
					'https://via.placeholder.com/800x400/6366f1/ffffff?text=Evento',

				//  DATAS E HORÁRIOS NO NOVO FORMATO
				data: `${formatarData(dataInicio)} até ${formatarData(dataTermino)}`,
				hora: formatarDiaSemanaHorario(
					dadosBanco.data_inicio,
					dadosBanco.data_termino
				),
				dataInicio: dadosBanco.data_inicio,
				dataTermino: dadosBanco.data_termino,
				dataEvento: `${dataInicio.getDate()} a ${dataTermino.getDate()} de ${dataInicio.toLocaleDateString(
					'pt-BR',
					{ month: 'long', year: 'numeric' }
				)}`,

				// Local
				local: {
					nome: dadosBanco.local || 'Local a definir',
					endereco: enderecoComCEP || 'Endereço não informado',
				},

				// Descrição
				descricao: dadosBanco.assunto_principal || 'Sem descrição disponível',
				descricaoCompleta: null,
				classificacao:
					dadosBanco.classificacao || 'Classificação não informada',

				// Categoria
				categoria: dadosBanco.categoria_nome,

				// Organizador
				organizadorNome:
					dadosBanco.organizador_nome || 'Organizador não informado',
				organizadorDescricao:
					dadosBanco.organizador_descricao || 'Sem descrição do organizador',
				organizadorEmail: dadosBanco.organizador_email,
				organizadorLogo:
					'https://via.placeholder.com/150/6366f1/ffffff?text=ORG',
				organizadorId: dadosBanco.organizador_id,

				// Ingressos
				ingressos: dadosBanco.ingressos || [],

				// Status
				ativo: dadosBanco.evento_ativo,

				// Campos opcionais
				topicos: null,
				tituloTopicos: null,
				detalhesAdicionais: null,
				premios: null,
			};
		} catch (err) {
			console.error(' Erro ao transformar dados:', err);
			throw new Error('Erro ao processar dados do evento');
		}
	};

	const userName = sessionStorage.getItem('userName') || 'Usuário';
	const userInitials = sessionStorage.getItem('userInitials') || 'U';

	if (loading) {
		return (
			<div className="home-organizador">
				<Navbar userName={userName} userInitials={userInitials} />
				<div className="home-organizador-layout">
					<Sidebar userType="organizador" />
					<main style={{ padding: '40px', textAlign: 'center' }}>
						<div className="loading-container">
							<div className="spinner"></div>
							<p style={{ marginTop: '20px', fontSize: '18px', color: '#666' }}>
								Carregando evento...
							</p>
						</div>
					</main>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="home-organizador">
				<Navbar userName={userName} userInitials={userInitials} />
				<div className="home-organizador-layout">
					<Sidebar userType="organizador" />
					<main style={{ padding: '40px', textAlign: 'center' }}>
						<div className="error-container">
							<h2 style={{ color: '#ef4444', marginBottom: '10px' }}>
								Erro ao carregar evento
							</h2>
							<p style={{ color: '#666', marginBottom: '20px' }}>{error}</p>
							<div
								style={{
									display: 'flex',
									gap: '10px',
									justifyContent: 'center',
								}}
							>
								<button
									onClick={buscarEvento}
									style={{
										padding: '10px 20px',
										backgroundColor: '#6366f1',
										color: 'white',
										border: 'none',
										borderRadius: '8px',
										cursor: 'pointer',
									}}
								>
									Tentar novamente
								</button>
								<button
									onClick={() => navigate(-1)}
									style={{
										padding: '10px 20px',
										backgroundColor: '#64748b',
										color: 'white',
										border: 'none',
										borderRadius: '8px',
										cursor: 'pointer',
									}}
								>
									← Voltar
								</button>
							</div>
						</div>
					</main>
				</div>
			</div>
		);
	}

	if (!evento) {
		return (
			<div className="home-organizador">
				<Navbar userName={userName} userInitials={userInitials} />
				<div className="home-organizador-layout">
					<Sidebar userType="organizador" />
					<main style={{ padding: '40px', textAlign: 'center' }}>
						<h2 style={{ color: '#666', marginBottom: '20px' }}>
							Evento não encontrado
						</h2>
						<button
							onClick={() => navigate(-1)}
							style={{
								padding: '10px 20px',
								backgroundColor: '#6366f1',
								color: 'white',
								border: 'none',
								borderRadius: '8px',
								cursor: 'pointer',
							}}
						>
							← Voltar
						</button>
					</main>
				</div>
			</div>
		);
	}

	return (
		<div className="home-organizador">
			<Navbar userName={userName} userInitials={userInitials} />
			<div className="home-organizador-layout">
				<Sidebar userType="organizador" />
				<main>
					<CardEventoOgz evento={evento} />
					<DetalhesEvento evento={evento} />
					<SobreOrganizador evento={evento} />
				</main>
			</div>
		</div>
	);
}

export default EventoConvidado;
