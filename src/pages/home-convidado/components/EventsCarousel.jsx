import useEmblaCarousel from "embla-carousel-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./Carousel";


export function EventsCarousel() {
  return (
    <Carousel
      opts={{ align: "center" }}   // melhor para carousels de cards
      className="w-full max-w-4xl mx-auto"
    >
      <CarouselContent className="px-4 gap-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem
            key={index}
            className="basis-auto shrink-0 w-48" // largura fixa do card
          >
            <div
              style={{
                height: 150,
                backgroundColor: "#1a1a1a",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "2rem",
                borderRadius: 12,
              }}
            >
              {index + 1}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious>❮</CarouselPrevious>
      <CarouselNext>❯</CarouselNext>
    </Carousel>
  );
}
