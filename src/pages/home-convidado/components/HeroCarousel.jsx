import useEmblaCarousel from "embla-carousel-react";
import { iconsHomeConv } from "../../../utils/iconsHomeConv.js";
import "./HeroCarousel.css"; 

export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  const slides = [
    { id: 1, title: "1" },
    { id: 2, title: "2" },
    { id: 3, title: "3" },
  ];

  return (
    <div className="carouselContainer">
      <button className="eventoAnterior" onClick={scrollPrev}>
        <img src={iconsHomeConv.setadaEsquerda} className="HomeConv-iconSeta" alt="Seta-Voltar" />
      </button>

      { /* VIEWPORT */}
      <div className="embla" ref={emblaRef}>
        <div className="eventoContainer">
          {slides.map((slide) => (
            <div className="eventoSlide" key={slide.id}>
              <div className="eventoCard">
                <h3>{slide.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="eventoProximo" onClick={scrollNext}>
        <img src={iconsHomeConv.setadaDireita} className="HomeConv-iconSeta" alt="Seta-Proximo" />
      </button>
    </div>
  );
}
