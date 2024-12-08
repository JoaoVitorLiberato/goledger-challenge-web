import React, { useState } from "react";
import { CarouselPlaylistProps } from "../../types/containerElemets"
import { useDispatch } from "react-redux"
import { deleteAsset } from "../../middlewares/middlewareServices"
import { middlewareGetData } from "../../middlewares/middlewareGetData"
import { setPlaylist, } from "../../plugins/store/modules/playlistModules"
import { setDialogPlaylist, setDialogListPlaylist } from "../../plugins/store/modules/dialogModules"
import { IPlaylist } from "../../types/assetsTypes"

import Snackbar from "@mui/material/Snackbar/Snackbar"
import Alert from "@mui/material/Alert"

import {
  CarouselContainer,
  CarouselTrack,
  Container, 
  NextButton, 
  PrevButton,
  Slide,
  CardPlaylistCache
} from "../../styles/components/caroucel/CaroucelCardPlaylist"

const CaroucelCardPlaylist: React.FC<CarouselPlaylistProps> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(false);
  const [ snackbar, setSnackber ] = useState({
    status: false,
    message: "",
    color: ""
  })

  const dispatch = useDispatch()

  const goToNext = (): void => {
    if ((currentSlide + 1) === slides.length) setCurrentSlide(0)
    if (currentSlide < slides.length - 1) setCurrentSlide(currentSlide + 1)
  }

  const goToPrev = (): void => {
    if (currentSlide === 0) setCurrentSlide(slides.length - 1)
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1)
  }

  const handleDeletePlaylist = async(key:string) => {
    if (!key) {
      setSnackber({
        status: true,
        color: "warning",
        message: "Sem chave"
      })
      return
    }

    setLoading(true)

    try {
      const responseMiddleware = await deleteAsset("playlist", key)
      if (/error/i.test(responseMiddleware as string)) throw Error()
      
      const responsePlaylist = await middlewareGetData("playlist")
      if (/error/i.test(responseMiddleware as string)) throw Error()

      dispatch(setPlaylist(responsePlaylist as IPlaylist[]))
      setSnackber({
        status: true,
        color: "sucesso",
        message: "Playlist apagada com sucesso!"
      })
    } catch {
      setSnackber({
        status: true,
        color: "error",
        message: "Erro ao apagar a playlist."
      })
    } finally {
      setLoading(false)
    }
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
                <CardPlaylistCache>
                  <h5>
                    { slide.name }
                  </h5>

                  <button
                    disabled={loading}
                    onClick={() => (
                      sessionStorage.setItem("playlist-selected", JSON.stringify(slide)),
                      dispatch(setDialogListPlaylist(false)),
                      dispatch(setDialogPlaylist(true))
                    )}
                  >
                    Ver Playlist
                  </button>

                  <button
                    disabled={loading}
                    onClick={() => (
                      handleDeletePlaylist(slide["@key"])
                    )}
                  >
                    { loading ? "Aguarde..." : "Excluir Playlist" }
                  </button>
                </CardPlaylistCache>
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

export default CaroucelCardPlaylist
