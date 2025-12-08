import './CardEvento.css';
import { iconsHO } from '../../../utils/icons';
import { useState, useEffect } from 'react';

function CardEvento() {
	const [evento, setEvento] = useState(null);
	const [loading, setLoading] = useState(true);
	const [erro, setErro] = useState(null);
	const [imagemComErro, setImagemComErro] = useState(false);

	useEffect(() => {
		const fetchProximoEvento = async () => {
			try {
				setLoading(true);
				setErro(null);
				const idconta = sessionStorage.getItem('userId');

				if (!idconta) {
					setErro('ID da conta não encontrado');
					setLoading(false);
					return;
				}

				// Buscar o próximo evento (primeiro da lista)
				const url = `http://localhost:3000/api/eventos/organizador/${idconta}`;
				const response = await fetch(url);

				if (!response.ok) {
					const errorData = await response.json().catch(() => ({}));
					throw new Error(
						errorData.error || errorData.details || 'Erro ao buscar evento'
					);
				}

				const data = await response.json();

				if (data.length === 0) {
					setEvento(null);
					setLoading(false);
					return;
				}

				// Pega o primeiro evento (mais próximo)
				const proximoEvento = data[0];

				// Formatar imagem
				const formatarImagemBase64 = (imagemBase64) => {
					if (!imagemBase64) return null;
					if (imagemBase64.startsWith('data:image')) {
						return imagemBase64;
					}
					return `data:image/jpeg;base64,${imagemBase64}`;
				};

				setEvento({
					id: proximoEvento.idevento,
					nome: proximoEvento.nome,
					imagem: formatarImagemBase64(proximoEvento.imagem),
					assunto_principal: proximoEvento.assunto_principal,
					data_inicio: new Date(proximoEvento.data_inicio),
					data_termino: new Date(proximoEvento.data_termino),
					local: proximoEvento.local,
					rua: proximoEvento.rua,
					numero: proximoEvento.numero,
					complemento: proximoEvento.complemento,
					bairro: proximoEvento.bairro,
					cidade: proximoEvento.cidade,
					estado: proximoEvento.estado,
					cep: proximoEvento.cep,
				});
			} catch (error) {
				setErro(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchProximoEvento();
	}, []);

	// Função para formatar data
	const formatarData = (dataInicio, dataTermino) => {
		const opcoes = { day: 'numeric', month: 'long' };
		const inicio = dataInicio.toLocaleDateString('pt-BR', opcoes);
		const termino = dataTermino.toLocaleDateString('pt-BR', opcoes);

		if (
			dataInicio.getDate() === dataTermino.getDate() &&
			dataInicio.getMonth() === dataTermino.getMonth()
		) {
			return inicio;
		}

		return `${inicio} à ${termino}`;
	};

	// Função para formatar horário
	const formatarHorario = (dataInicio, dataTermino) => {
		const horaInicio = dataInicio.toLocaleTimeString('pt-BR', {
			hour: '2-digit',
			minute: '2-digit',
		});
		const horaTermino = dataTermino.toLocaleTimeString('pt-BR', {
			hour: '2-digit',
			minute: '2-digit',
		});

		return `${horaInicio} às ${horaTermino}`;
	};

	// Função para formatar endereço
	const formatarEndereco = () => {
		const partes = [];

		if (evento.local) partes.push(evento.local);
		if (evento.rua) partes.push(evento.rua);
		if (evento.numero) partes.push(evento.numero);
		if (evento.bairro) partes.push(evento.bairro);
		if (evento.cidade) partes.push(evento.cidade);
		if (evento.estado) partes.push(evento.estado);

		return partes.length > 0 ? partes.join(', ') : 'Endereço não informado';
	};

	// Função para calcular duração
	const calcularDuracao = () => {
		if (!evento) return 'N/A';

		const diff = evento.data_termino - evento.data_inicio;
		const horas = Math.floor(diff / (1000 * 60 * 60));
		const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

		if (horas === 0) return `${minutos}min`;
		if (minutos === 0) return `${horas}h`;
		return `${horas}h${minutos}min`;
	};

	// Tratamento de erro de imagem
	const handleImageError = () => {
		setImagemComErro(true);
	};

	// Loading
	if (loading) {
		return (
			<div className="card-evento-detalhes-container">
				<div className="info-card-evento">
					<p style={{ textAlign: 'center', padding: '2rem' }}>
						Carregando evento...
					</p>
				</div>
			</div>
		);
	}

	// Erro
	if (erro) {
		return (
			<div className="card-evento-detalhes-container">
				<div className="info-card-evento">
					<p style={{ color: 'red', textAlign: 'center', padding: '2rem' }}>
						Erro ao carregar evento: {erro}
					</p>
				</div>
			</div>
		);
	}

	// Sem eventos
	if (!evento) {
		return (
			<div className="card-evento-detalhes-container">
				<div className="info-card-evento">
					<p style={{ textAlign: 'center', padding: '2rem' }}>
						Você ainda não tem eventos criados.
					</p>
				</div>
			</div>
		);
	}

	// Exibir evento
	return (
		<div className="card-evento-detalhes-container">
			<div className="info-card-evento">
				<div className="info-evento-imagem">
					{evento.imagem && !imagemComErro ? (
						<img
							src={evento.imagem}
							alt={evento.nome}
							onError={handleImageError}
						/>
					) : (
						<div
							style={{
								width: '100%',
								height: '100%',
								background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								color: 'white',
								fontSize: '1.5rem',
								fontWeight: 'bold',
								textAlign: 'center',
								padding: '1rem',
							}}
						>
							{evento.nome}
						</div>
					)}
				</div>

				<div className="info-evento-content">
					<h2 className="info-evento-titulo">{evento.nome}</h2>

					{evento.assunto_principal && (
						<div className="info-header-evento">
							<img
								src={iconsHO.assunto}
								alt="assunto"
								className="info-icon-evento"
							/>
							<span className="info-label-evento">
								{evento.assunto_principal}
							</span>
						</div>
					)}

					<div className="info-header-evento">
						<img
							src={iconsHO.calendario}
							alt="calendario"
							className="info-icon-evento"
						/>
						<span className="info-label-evento">
							{formatarData(evento.data_inicio, evento.data_termino)}
						</span>
					</div>

					<div className="info-header-evento">
						<img
							src={iconsHO.relogio2}
							alt="relogio2"
							className="info-icon-evento"
						/>
						<span className="info-label-evento">
							{formatarHorario(evento.data_inicio, evento.data_termino)}
						</span>
					</div>

					<div className="info-header-evento">
						<img src={iconsHO.local} alt="local" className="info-icon-evento" />
						<span className="info-label-evento">{formatarEndereco()}</span>
					</div>

					<div className="info-header-evento">
						<img src={iconsHO.timer} alt="timer" className="info-icon-evento" />
						<span className="info-label-evento">{calcularDuracao()}</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CardEvento;
