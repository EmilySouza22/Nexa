import React, { useState, useEffect, useCallback, useRef } from 'react';
import './SectionMuralEvento.css';
import { iconsHomeConv } from '../../../utils/iconsHomeConv.js';
import { HeroCarousel } from './HeroCarousel.jsx';
import axios from 'axios';
import { formatarData } from '../../../utils/dataFormat.js';

//Coloquei
const API_URL = import.meta.env.VITE_API_URL;

function SectionMuralEvento() {
	const [infoEventos, setinfoEventos] = useState([]);
	const [loading, setLoading] = useState(false);
	const hasRunRef = useRef(false);

	useEffect(() => {
		const pegarInfoEventosMain = async () => {
			if (hasRunRef.current) {
				return;
			}

			hasRunRef.current = true;
			setLoading(true);

			try {
				console.log('pegarInfoEventosMain: chamada na api');

				const response = await axios.get(`${API_URL}/eventos/all`);

				console.log('pegarInfoEventosMain: resultado na api:', response.data);

				if (response.status === 200) {
					const data = response.data;
					setinfoEventos(data.events);
				} else {
					console.error('Falha ao carregar dados dos eventos.');
					setinfoEventos([]);
				}
			} catch (error) {
				console.error('Erro ao carregar dados dos eventos:', error);
				setinfoEventos([]);
			} finally {
				setLoading(false);
			}
		};
		pegarInfoEventosMain();
	}, []);

	return (
		<div className="HomeConv-MuralEvento">
			<HeroCarousel />
			<div className="HomeConv-Paginacao"></div>
			{infoEventos[0] && (
				<h3 className="HomeConv-TitleEvento">{infoEventos[0].nome}</h3>
			)}
			<div className="HomeConv-InfoEvento">
				<div className="HomeConv-InfoLocal">
					<img
						src={iconsHomeConv.localIcon}
						alt="Icon Localização"
						className="HomeConvIconMural"
					/>
					{infoEventos[0] && (
						<p className="HomeConvTextMural">
							{infoEventos[0].cidade}
						</p>
					)}
				</div>
				<div className="HomeConv-InfoData">
					<img
						src={iconsHomeConv.calendarioIcon}
						alt="Icon Data"
						className="HomeConvIconMural"
					/>

					{infoEventos[0] && (
						<p className="HomeConvTextMural">
							{formatarData(infoEventos[0].data_inicio)}    
						</p>
					)}

                    {/* endereco_evento.cidade, endereco_evento.estado */}
				</div>
			</div>
		</div>
	);
}

export default SectionMuralEvento;
