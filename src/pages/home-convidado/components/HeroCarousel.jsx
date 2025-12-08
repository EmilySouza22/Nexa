import useEmblaCarousel from 'embla-carousel-react';
import { iconsHomeConv } from '../../../utils/iconsHomeConv.js';
import './HeroCarousel.css';
import { useEffect } from 'react';
// import Autoplay from 'embla-carousel-autoplay';

export function HeroCarousel({ eventos, onSlideChange }) {
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
			console.log(emblaApi.slideNodes()); // Access API

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
		<div className="carouselContainer">
			<button className="eventoAnterior" onClick={scrollPrev}>
				<img
					src={iconsHomeConv.setadaEsquerda}
					className="HomeConv-iconSeta"
					alt="Seta-Voltar"
				/>
			</button>

			{/* VIEWPORT */}
			<div className="embla" ref={emblaRef}>
				<div className="eventoContainer">
					{eventos.map((slide) => (
						<div className="eventoSlide" key={slide.idevento}>
							<div className="eventoCard">
								{slide.imagem && (
									<img src={getImageSrc(slide.imagem)} alt={slide.nome} />
								)}
							</div>
						</div>
					))}
				</div>
			</div>

			<button className="eventoProximo" onClick={scrollNext}>
				<img
					src={iconsHomeConv.setadaDireita}
					className="HomeConv-iconSeta"
					alt="Seta-Proximo"
				/>
			</button>
		</div>
	);
}
