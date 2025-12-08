import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './MinhaContaOrg.css';
import { iconsPE2 } from '../../utils/icons';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

// Componente principal do formulário "Minha Conta" - Organizador
function MinhaConta() {
	// Pegar dados do sessionStorage (salvos no login)
	const userName = sessionStorage.getItem('userName') || 'Organizador';
	const userInitials = sessionStorage.getItem('userInitials') || 'OR';
	const userCpf = sessionStorage.getItem('userCpf');
	const userId = sessionStorage.getItem('userId'); // ID do usuário logado

	// ========== ESTADOS (variáveis que guardam dados) ==========

	const [dadosMinhaContaOrg, setDadosMinhaContaOrg] = useState({
		nomeCompleto: '',
		dataNascimento: '',
		cpf_cnpj: '',
		email: '',
		telefone: '',
		senha: '',
	});

	// Estados auxiliares
	const [mensagem, setMensagem] = useState('');
	const [carregando, setCarregando] = useState(false);

	// ========== BUSCAR DADOS DO USUÁRIO QUANDO A PÁGINA CARREGAR ==========
	useEffect(() => {
		const buscarDados = async () => {
			try {
				const response = await fetch(
					`http://localhost:3000/api/auth/usuario/${userId}`
				);
				const data = await response.json();

				if (response.ok) {
					// Preenche os campos com os dados vindos do banco
					setDadosMinhaContaOrg({
						nomeCompleto: data.usuario.nome || '',
						email: data.usuario.email || '',
						telefone: data.usuario.telefone || '',
						cpf_cnpj: data.usuario.cpf_cnpj || '',
						dataNascimento: '',
						senha: '', // Senha sempre vazia por segurança
					});
				}
			} catch (error) {
				console.error('Erro ao buscar dados:', error);
				setMensagem('Erro ao carregar dados do usuário');
			}
		};

		// Só busca se tiver userId
		if (userId) {
			buscarDados();
		}
	}, [userId]); // Executa quando userId mudar

	// ========== FUNÇÕES QUE ATUALIZAM OS DADOS ==========

	// Atualiza os campos conforme o usuário digita
	const atualizarDadosOrg = (e) => {
		const { name, value } = e.target;
		setDadosMinhaContaOrg((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// Envia os dados para o banco de dados via API
	const enviarAtualizacao = async (e) => {
		e.preventDefault();
		setMensagem('');
		setCarregando(true);

		try {
			// Faz a chamada para a API de atualização
			const response = await fetch(
				`http://localhost:3000/api/auth/usuario/${userId}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(dadosMinhaContaOrg),
				}
			);

			const data = await response.json();

			if (response.ok) {
				setMensagem('Dados atualizados com sucesso!');

				// Atualiza o sessionStorage se mudou o nome
				if (dadosMinhaContaOrg.nomeCompleto) {
					sessionStorage.setItem('userName', dadosMinhaContaOrg.nomeCompleto);
				}
			} else {
				setMensagem(data.error || 'Erro ao atualizar dados');
			}
		} catch (error) {
			setMensagem('Erro ao atualizar dados. Tente novamente.');
			console.error('Erro:', error);
		} finally {
			setCarregando(false);
		}
	};

	// ========== RETORNO DO COMPONENTE (o que aparece na tela) ==========
	const location = useLocation();
	const isMinhaContaAtiva = location.pathname === '/organizador/minha-conta';

	return (
		<div className="perfil-organizador">
			<Navbar userName={userName} userInitials={userInitials} />
			<div className="perfil-organizador-layout">
				<Sidebar
					userType="organizador"
					userHasCpf={!!userCpf} // !! converte em boolean (true se tiver CPF, false se não)
				/>
				<main className="perfil-organizador-content">
					<div className="minha-conta-container">
						{/* Barra de navegação no topo */}
						<div className="abas-container">
							<NavLink
								to="/organizador/perfil"
								className={({ isActive }) =>
									isActive
										? 'aba ativa'
										: isMinhaContaAtiva
										? 'aba aba-com-risco'
										: 'aba'
								}
							>
								Perfil
							</NavLink>
							<NavLink
								to="/organizador/minha-conta"
								className={({ isActive }) =>
									isActive ? 'aba ativa' : 'aba aba-com-risco'
								}
							>
								Dados
							</NavLink>
						</div>

						{/* Formulário principal */}
						<form onSubmit={enviarAtualizacao} className="form-minha-conta">
							{/* Campo Nome Completo */}
							<div className="campo-input">
								<label htmlFor="nomeCompleto">Nome completo</label>
								<input
									type="text"
									id="nomeCompleto"
									name="nomeCompleto"
									value={dadosMinhaContaOrg.nomeCompleto}
									onChange={atualizarDadosOrg}
									required
								/>
							</div>

							{/* Campo Data de Nascimento */}
							<div className="campo-input">
								<label htmlFor="dataNascimento">Data de nascimento</label>
								<input
									type="text"
									id="dataNascimento"
									name="dataNascimento"
									value={dadosMinhaContaOrg.dataNascimento}
									onChange={atualizarDadosOrg}
									required
								/>
							</div>

							{/* Campo CPF ou CNPJ */}
							<div className="campo-input">
								<label htmlFor="cpf_cnpj">CPF ou CNPJ</label>
								<input
									type="text"
									id="cpf_cnpj"
									name="cpf_cnpj"
									value={dadosMinhaContaOrg.cpf_cnpj}
									onChange={atualizarDadosOrg}
									required
								/>
							</div>

							{/* Campo E-mail */}
							<div className="campo-input">
								<label htmlFor="email">E-mail</label>
								<input
									type="email"
									id="email"
									name="email"
									value={dadosMinhaContaOrg.email}
									onChange={atualizarDadosOrg}
									required
								/>
							</div>

							{/* Campo Telefone */}
							<div className="campo-input">
								<label htmlFor="telefone">Telefone</label>
								<input
									type="text"
									id="telefone"
									name="telefone"
									value={dadosMinhaContaOrg.telefone}
									onChange={atualizarDadosOrg}
									required
								/>
							</div>

							{/* Campo Senha */}
							<div className="campo-input">
								<label htmlFor="senha">Senha</label>
								<input
									type="password"
									id="senha"
									name="senha"
									value={dadosMinhaContaOrg.senha}
									onChange={atualizarDadosOrg}
									placeholder="Deixe em branco para manter a atual"
								/>
							</div>

							{/* Mensagem de feedback */}
							{mensagem && (
								<div
									style={{
										padding: '10px',
										marginBottom: '10px',
										borderRadius: '8px',
										backgroundColor: mensagem.includes('sucesso')
											? '#d4edda'
											: '#f8d7da',
										color: mensagem.includes('sucesso') ? '#155724' : '#721c24',
									}}
								>
									{mensagem}
								</div>
							)}

							{/* Botão de Salvar */}
							<button
								type="submit"
								className="btn-salvar"
								disabled={carregando}
							>
								{/* Ícone de disquete (salvar) */}
								<img src={iconsPE2.save} alt="Salvar" className="icon-save" />
								{carregando ? 'Enviando...' : 'Salvar Alterações'}
							</button>
						</form>
					</div>
				</main>
			</div>
		</div>
	);
}

export default MinhaConta;
