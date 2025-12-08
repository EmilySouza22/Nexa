import React, { useState } from 'react';
import './SectionMuralEvento.css';
import { iconsHomeConv } from '../../../utils/iconsHomeConv.js';
import { HeroCarousel } from './HeroCarousel.jsx';
import { formatarData } from '../../../utils/dataFormat.js';

function SectionMuralEvento({ eventosPremium }) {
	const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
	const currentEvent = eventosPremium[currentSlideIndex];

	return (
		<div className="HomeConv-MuralEvento">
			<HeroCarousel
				eventos={eventosPremium}
				onSlideChange={setCurrentSlideIndex}
			/>
			<div className="HomeConv-Paginacao"></div>
			{currentEvent && (
				<h3 className="HomeConv-TitleEvento">{currentEvent.nome}</h3>
			)}
			<div className="HomeConv-InfoEvento">
				<div className="HomeConv-InfoLocal">
					<img
						src={iconsHomeConv.localIcon}
						alt="Icon Localização"
						className="HomeConvIconMural"
					/>
					{currentEvent && (
						<p className="HomeConvTextMural">{currentEvent.cidade}</p>
					)}
				</div>
				<div className="HomeConv-InfoData">
					<img
						src={iconsHomeConv.calendarioIcon}
						alt="Icon Data"
						className="HomeConvIconMural"
					/>

					{currentEvent && (
						<p className="HomeConvTextMural">
							{formatarData(currentEvent.data_inicio)}
						</p>
					)}

					{/* endereco_evento.cidade, endereco_evento.estado */}
				</div>
			</div>
		</div>
	);
}

export default SectionMuralEvento;
