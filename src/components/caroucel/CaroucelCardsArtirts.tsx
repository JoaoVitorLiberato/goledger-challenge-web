import React, { useState } from "react";
import CardArtirts from "../cards/CardArtirts"
import { CarouselProps } from "../../types/containerElemets"
import {
  CarouselContainer,
  CarouselTrack,
  Container, 
  NextButton, 
  PrevButton,
  Slide
} from "../../styles/components/caroucel/CaroucelCardArtirts"

const CaroucelCardsArtirts: React.FC<CarouselProps> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToNext = (): void => {
    if ((currentSlide + 1) === slides.length) setCurrentSlide(0)
    if (currentSlide < slides.length - 1) setCurrentSlide(currentSlide + 1)
  }

  const goToPrev = (): void => {
    if (currentSlide === 0) setCurrentSlide(slides.length - 1)
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1)
  }


  return (
    <Container>
      <CarouselContainer>
        <CarouselTrack
          translate={-currentSlide * 100}
        >
          {
            slides.map((slide, index) => (
              <Slide key={index}>
                <CardArtirts
                  image={slide.image}
                  name={slide.name}
                  category={slide.category}
                  key={`${slide.name}-${index}`}
                />
              </Slide>
            ))
          }
        </CarouselTrack>
      </CarouselContainer>

      <PrevButton
        bgcolor={currentSlide > 0 ? "#cdcdcd" : ""}
        onClick={() => (goToPrev())}
      >
        <img
          src="/img/chevron.png"
          alt="Seta para Ir para próximos produto."
        />
      </PrevButton>

      <NextButton
        bgcolor={(currentSlide + 1) < slides.length ? "#cdcdcd" : ""}
        onClick={() => (goToNext())}
      >
        <img
          src="/img/chevron.png"
          alt="Seta para Ir para próximos produto."
        />
      </NextButton>
    </Container>
  );
};

export default CaroucelCardsArtirts
