import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setDialogListPlaylist } from "../../plugins/store/modules/dialogModules"
import  { RootState } from "../../plugins/store"
import { IPlaylist } from "../../types/assetsTypes"
import DialogComponent from "../../components/dialogs/DialogComponent"
import CaroucelCardPlaylist from "../../components/caroucel/CaroucelCardPlaylist"

import {
  Container,
  LimitationWidth,
  Session,
  Button,
  ImageModel,
  ContainerDialogPlaylist
} from "../../styles/views/home/hero"
import TextField from "@mui/material/TextField"

function Hero () {
  const [ input, setInput ] = useState("")
  const [ searchPlaylist, setSearchPlaylist ] = useState([] as IPlaylist[])

  const { playlist } = useSelector((state:RootState) => state.playlist)
  const { dialogListPlaylist } = useSelector((state:RootState) => state.dialog)

  const dispatch = useDispatch()

  useEffect(() => {
    filterSearchPlaylist()
  }, [input, playlist])

  const filterSearchPlaylist = (): void => {
    if (input === "") {
      setSearchPlaylist([])
      return
    }
    
    const PLAYLIST_FILTERD = playlist.filter((item) => {
      if (String(item.name).toUpperCase().includes(String(input).toUpperCase())) {
        return item
      }
    })

    setSearchPlaylist(PLAYLIST_FILTERD)
  }

  return (
    <Container>
      <LimitationWidth>
        <Session>
          <h2>
            Já ouviu seus cantores preferidos?
          </h2>

          <p>
            Bem-vindo ao seu novo destino musical! Nosso player de músicas oferece uma experiência
            personalizada para você curtir suas músicas favoritas em qualquer lugar, a qualquer
            hora. Escolha o plano que melhor combina com você e desbloqueie um mundo de possibilidades
            sonoras.
          </p>

          <Button
            onClick={() => (
              dispatch(setDialogListPlaylist(!dialogListPlaylist))
            )}
          >
            <span>
              Conhecer
            </span>
          </Button>

          <DialogComponent
            add="active"
            title="Playlist's"
            open={dialogListPlaylist}
            close={() => (
              dispatch(setDialogListPlaylist(!dialogListPlaylist))
            )}
          >
            <ContainerDialogPlaylist>
              <TextField
                label="Nome da Playlist"
                placeholder="Informe no nome da sua playlist para procurar"
                color="warning"
                variant="outlined"
                onChange={(e) => (setInput(e.target.value))}
              />

              {
                searchPlaylist.length > 1 &&
                  <CaroucelCardPlaylist
                    slides={searchPlaylist}
                  />
              }
            </ContainerDialogPlaylist>
          </DialogComponent>
        </Session>

          <ImageModel 
            src="/img/views/hero/Music-cuate.png"
            alt="Escutes suas musica preferidas na GoLedger Music - Aqui você ouvi tudo e todos."
          />
      </LimitationWidth>
    </Container>
  )
}

export default Hero
