import React, { useEffect, useRef } from 'react';
import EmblaCarousel from 'embla-carousel';
import './EventsCarousel.css';
import { iconsHomeConv } from "../../../utils/iconsHomeConv.js";

export function EventsCarousel() {
	const rootRef = useRef(null);
	const prevBtnRef = useRef(null);
	const nextBtnRef = useRef(null);

	useEffect(() => {
		const rootNode = rootRef.current;
		const viewportNode = rootNode.querySelector('.embla__viewport');

		const embla = EmblaCarousel(viewportNode);

		const prevBtn = prevBtnRef.current;
		const nextBtn = nextBtnRef.current;

		const onPrevClick = () => embla.scrollPrev();
		const onNextClick = () => embla.scrollNext();

		prevBtn.addEventListener('click', onPrevClick);
		nextBtn.addEventListener('click', onNextClick);

		return () => {
			prevBtn.removeEventListener('click', onPrevClick);
			nextBtn.removeEventListener('click', onNextClick);
			embla.destroy();
		};
	}, []);

	return (
		<div className="emblaEventsCarousel" ref={rootRef}>
			<button className="embla__prev" ref={prevBtnRef}>
				<img src={iconsHomeConv.setadaEsquerda} className="HomeConv-EventsCarouselSeta" alt="Seta-Voltar" />
			</button>

			<div className="embla__viewport">
				<div className="embla__container">
					<div className="embla__slide">Slide 1</div>
					<div className="embla__slide">Slide 2</div>
					<div className="embla__slide">Slide 3</div>
					<div className="embla__slide">Slide 4</div>
					<div className="embla__slide">Slide 5</div>
				</div>
			</div>

			<button className="embla__next" ref={nextBtnRef}>
				<img src={iconsHomeConv.setadaDireita} className="HomeConv-EventsCarouselSeta" alt="Seta-Proximo" />
			</button>
		</div>
	);
}
