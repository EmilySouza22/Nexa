import React, { useEffect, usest } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import './EventsCarousel.css';
import { iconsHomeConv } from '../../../utils/iconsHomeConv.js';

export function EventsCarousel({ eventos, onSlideChange }) {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

	const scrollPrev = () => {
		if (emblaApi) {
			emblaApi.scrollPrev();
		}
	};

	const scrollNext = () => {
		if (emblaApi) {
			emblaApi.scrollNext();
		}
	};

	const getImageSrc = (imagem) => {
		if (!imagem) return '';

		// Remove all whitespace and newlines from base64 strings
		let cleanedImagem = imagem.replace(/\s+/g, '');

		// Check if it's already a complete data URI
		if (cleanedImagem.startsWith('data:')) {
			return cleanedImagem;
		}
		// If not, assume it's base64 and add the prefix
		return `data:image/jpeg;base64,${cleanedImagem}`;
	};

	useEffect(() => {
		if (emblaApi) {
			// Listen for slide changes
			const onSelect = () => {
				const selectedIndex = emblaApi.selectedScrollSnap();
				if (onSlideChange) {
					onSlideChange(selectedIndex);
				}
			};

			emblaApi.on('select', onSelect);
			// Call once on mount to set initial slide
			onSelect();

			return () => {
				emblaApi.off('select', onSelect);
			};
		}
	}, [emblaApi, onSlideChange]);

	return (
		<div className="emblaEventsCarousel">
			<button className="embla__prev" onClick={scrollPrev}>
				<img
					src={iconsHomeConv.setadaEsquerda}
					className="HomeConv-EventsCarouselSeta"
					alt="Seta-Voltar"
				/>
			</button>

			<div className="embla__viewport" ref={emblaRef}>
				<div className="embla__container">
					{eventos.map((evento) => (
						<div className="embla__slide" key={evento.idevento}>
							{evento.imagem ? (
								<img className='HomeConv-img' src={getImageSrc(evento.imagem)} alt={evento.nome} />
							) : (
								<p>{evento.nome}</p>
							)}
						</div>
					))}
				</div>
			</div>

			<button className="embla__next" onClick={scrollNext}>
				<img
					src={iconsHomeConv.setadaDireita}
					className="HomeConv-EventsCarouselSeta"
					alt="Seta-Proximo"
				/>
			</button>
		</div>
	);
}
