import React, { useState } from "react";
import { CarouselAlbumProps } from "../../types/containerElemets"
import CardAlbum from "../cards/CardAlbum"

import Snackbar from "@mui/material/Snackbar/Snackbar"
import Alert from "@mui/material/Alert"

import {
  CarouselContainer,
  CarouselTrack,
  Container, 
  NextButton, 
  PrevButton,
  Slide
} from "../../styles/components/caroucel/CaroucelCardAlbum"

const CaroucelCardAlbum: React.FC<CarouselAlbumProps> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [ snackbar, setSnackber ] = useState({
    status: false,
    message: "",
    color: ""
  })

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
                <CardAlbum
                  id={slide["@key"]}
                  name={slide.name}
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

      <Snackbar 
        open={snackbar.status} 
        autoHideDuration={6000} 
        onClose={() => setSnackber({ ...snackbar, status: !snackbar.status })}
      >
        <Alert
          onClose={() => setSnackber({ ...snackbar, status: !snackbar.status })}
          severity={snackbar.color}
          variant="filled"
          sx={{ width: '100%' }}
        >
          { snackbar.message }
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CaroucelCardAlbum
