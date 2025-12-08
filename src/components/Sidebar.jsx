import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { iconsSidebar } from '../utils/icons';
import toastr from '../utils/toastr';

export default function Sidebar({ userType, userHasCpf }) {
	/*Criação de uma Side bar que para diferenciar vamos usar props, de acordo com o tipo de usuário 
    - userType: "convidado" ou "organizador"
    - userHasCpf: boolean que indica se o usuário tem CPF cadastrado */

	const [isOpen, setIsOpen] = useState(false); /*Pra começar com ela fechada*/
	/*- isOpen: guarda se a sidebar está aberta (true) ou fechada (false)
     - setIsOpen: função para mudar o valor de isOpen */

	const navigate = useNavigate(); /*pra navegar entre as páginas*/

	const setaSidebar = () => {
		/*função que abre e fecha a sidebar (é chamada quando eu clico no botão da seta)*/
		setIsOpen(!isOpen);
	};

	/*função pra trocar entre convidado e organizador*/

	const handleTrocaTipo = async () => {
		if (userType === 'organizador') {
			// Organizador sempre pode virar convidado
			navigate('/');
		} else if (userType === 'convidado') {
			// Convidado só pode virar organizador se tiver CPF cadastrado
			if (userHasCpf) {
				navigate('/organizador');
			} else {
				// Se não tiver CPF, mostra um alerta e redireciona pro perfil
				alert(
					'Você precisa cadastrar seu CPF no perfil para acessar a área de organizador!'
				);
				navigate('/perfil-convidado');
			}
			// Convidado precisa verificar se tem CPF cadastrado
			const userId = sessionStorage.getItem('userId');

			try {
				// Busca os dados atualizados do banco
				const response = await fetch(
					`http://localhost:3000/api/auth/usuario/${userId}`
				);
				const data = await response.json();

				if (response.ok && data.usuario.cpf_cnpj) {
					// Tem CPF cadastrado! Atualiza o sessionStorage e navega
					sessionStorage.setItem('userCpf', data.usuario.cpf_cnpj);
					navigate('/organizador');
				} else {
					// Não tem CPF, mostra toastr de erro e redireciona pro perfil
					toastr.info(
						'Você precisa cadastrar seu CPF no perfil para acessar a área de organizador!',
						'CPF não encontrado'
					);
					navigate('/perfil-convidado');
				}
			} catch (error) {
				console.error('Erro ao verificar CPF:', error);
				toastr.error(
					'Erro ao verificar seus dados. Tente novamente.',
					'Erro de conexão'
				);
			}
		}
	};

	let sidebarClass = 'sidebar'; /*pra guardar o nome no css*/
	if (isOpen) {
		sidebarClass = 'sidebar aberta';
	} else {
		sidebarClass = 'sidebar fechada';
	}

	let iconeSeta = iconsSidebar.seta; /*pra trocar o icon*/
	if (!isOpen) {
		iconeSeta = iconsSidebar.seta2;
	}

	return (
		<aside className={sidebarClass}>
			<div className="sidebar-header">
				<h3>Seções</h3>
				<button className="sidebar-button" onClick={setaSidebar}>
					<img src={iconeSeta} alt="Toggle" />
				</button>
			</div>
			<nav className="sidebar-nav">
				<Link
					to={userType === 'organizador' ? '/organizador' : '/'}
					className="sidebar-link"
				>
					<img src={iconsSidebar.home} alt="Home" className="icon" />
					<span>Home</span>
				</Link>

				{userType === 'convidado' && (
					<>
						<Link className="sidebar-link">
							<img
								src={iconsSidebar.ingresso}
								alt="Ingressos"
								className="icon"
							/>
							<span>Meus ingressos</span>
						</Link>
						<Link href="#" className="sidebar-link">
							<img
								src={iconsSidebar.certificado}
								alt="Certificados"
								className="icon"
							/>
							<span>Certificados</span>
						</Link>
						<Link className="sidebar-link">
							<img
								src={iconsSidebar.pesquisas}
								alt="Pesquisas"
								className="icon"
							/>
							<span>Pesquisas</span>
						</Link>
					</>
				)}

				{userType === 'organizador' && (
					<>
						<Link to="/meus-eventos" className="sidebar-link">
							<img
								src={iconsSidebar.comemoracao}
								alt="Eventos"
								className="icon"
							/>
							<span>Meus eventos</span>
						</Link>
						<Link to="/criar-evento" className="sidebar-link">
							<img
								src={iconsSidebar.calendario}
								alt="Novo evento"
								className="icon"
							/>
							<span>Novo evento</span>
						</Link>
						<Link to="/dados" className="sidebar-link">
							<img src={iconsSidebar.dados} alt="Dados" className="icon" />
							<span>Dados</span>
						</Link>
					</>
				)}
			</nav>
			<div className="sidebar-footer">
				<Link
					to={
						userType === 'organizador'
							? '/organizador/perfil'
							: '/perfil-convidado'
					}
					className="sidebar-link"
				>
					<img src={iconsSidebar.perfil} alt="Perfil" className="icon" />
					<span>Meu perfil</span>
				</Link>

				{/* Botão de troca entre convidado e organizador */}
				<button onClick={handleTrocaTipo} className="sidebar-link">
					<img src={iconsSidebar.change} alt="Trocar tipo" className="icon" />
					<span>
						{userType === 'organizador' ? 'Convidado' : 'Organizador'}
					</span>
				</button>

				<Link to="/login" className="sidebar-link">
					<img src={iconsSidebar.exit} alt="Sair" className="icon" />
					<span>Sair</span>
				</Link>
			</div>
		</aside>
	);
}
