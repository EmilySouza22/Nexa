import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import '../home-convidado/HomeConvidado.css';
import SectionBuscarEvento from './components/SectionBuscarEvento';
import SectionMuralEvento from './components/SectionMuralEvento';
import Footer from '../../components/Footer.jsx';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
//Coloquei
const API_URL = import.meta.env.VITE_API_URL;

function HomeConvidado() {
	//Dados mockados
	const userName = 'Organizadora Emily';
	const userInitials = 'EA';
	const [loading, setLoading] = useState(false);
	const [eventosPremium, setEventosPremium] = useState([]);
	const [eventosHoje, setEventosHoje] = useState([]);
	const hasRunRef = useRef(false);

	useEffect(() => {
		const pegarInfoEventosMain = async () => {
			if (hasRunRef.current) {
				return;
			}

			hasRunRef.current = true;
			setLoading(true);

			try {
				const response = await axios.get(`${API_URL}/eventos/all`);

				if (response.status === 200) {
					const data = response.data;
					setEventosHoje(data.carrosselHoje);
					setEventosPremium(data.carrosselPrincipal);
				} else {
					console.error('Falha ao carregar dados dos eventos.');
					setEventosHoje([]);
					setEventosPremium([]);
				}
			} catch (error) {
				console.error('Erro ao carregar dados dos eventos:', error);
				setEventosHoje([]);
				setEventosPremium([]);
			} finally {
				setLoading(false);
			}
		};
		pegarInfoEventosMain();
	}, []);

	return (
		<div>
			<Navbar userName={userName} userInitials={userInitials} />
			<Sidebar userType="convidado" />
			<SectionMuralEvento eventosPremium={eventosPremium} />
			<SectionBuscarEvento eventosHoje={eventosHoje} />
			<Footer />
		</div>
	);
}

export default HomeConvidado;
