import { useEffect, useState } from "react"
import DialogComponent from "./DialogComponent"
import { useSelector, useDispatch } from "react-redux"
import { setDialogDetailArtist } from "../../plugins/store/modules/dialogModules"
import { setSong } from "../../plugins/store/modules/playlistModules"
import { RootState } from "../../plugins/store"
import { IArtist, IAlbum, ISong } from "../../types/assetsTypes"
import { deleteAsset } from "../../middlewares/middlewareServices"
import { middlewareGetData } from "../../middlewares/middlewareGetData"
import { mountedObjectPlaylist } from "../../helpers/mountedObjectPlaylist"
import { setListSong } from "../../plugins/store/modules/playlistModules"
import CaroucelCardAlbum from "../caroucel/CaroucelCardAlbum"

import {
  Container,
  ContentSongs,
  ContentAlbums,
  ContentCardAlbum
} from "../../styles/components/dialogs/DialogDetailArtist"
import FormUpdateAssets from "../form/update/FormUpdateAssets"
import { Alert, Snackbar } from "@mui/material"
import CardAlbum from "../cards/CardAlbum"

export default function DialogDetailArtist () {
  const [ updateID, setUpdateID ] = useState("")
  const [ loading, setLoading ] = useState(false)
  const [ snackbar, setSnackber ] = useState({
    status: false,
    message: "",
    color: ""
  })

  const dispatch = useDispatch()
  const { dialogDetailArtist } = useSelector((state: RootState) => state.dialog)
  const { artists, albuns, songs } = useSelector((state: RootState) => state.playlist)

  const renderDatailsArtist = () => {
    try {
      const ARTIST_ID = sessionStorage.getItem("artist-selected")
      if (!ARTIST_ID) throw Error()

      const DETAILS_ARTIST = artists.find((artist) => {
        if (String(artist["@key"] || "") === String(ARTIST_ID || "")) return artist
      })

      if (!DETAILS_ARTIST) throw Error()

      return DETAILS_ARTIST as IArtist
    } catch {
      return {
        error: true,
        title: "Erro",
        description: "Erro ao encontrar o artista"
      }
    }
  }

  useEffect(() => {
    renderDatailsArtist()
    renderSongsArtist()
    renderAlbum()
  }, [artists, albuns, songs])

  const renderSongsArtist = () => {
    try {
      const ALBUNS_ID: Array<string> = []
      
      albuns.forEach((albumItem) => {
        const ARTIST_ID = sessionStorage.getItem("artist-selected")
        if (!ARTIST_ID) throw Error()
  
        if (String(albumItem.artist["@key"]) === ARTIST_ID) {
          ALBUNS_ID.push(albumItem["@key"])
        }
      })
  
      return songs.filter((song) => {
        if (ALBUNS_ID.includes(String(song.album["@key"]))) {
          return song
        }
      }) as ISong[]
    } catch {
      return {
        error: true,
      }
    }
  }

  const renderDetailAlbum = (id:string) => {
    return albuns.find(item => {
      if (String(item["@key"]) === String(id)) return item
    }) as IAlbum
  }

  const renderAlbum = () => {
    try {
      const ARTIST_ID = sessionStorage.getItem("artist-selected")
      if (!ARTIST_ID) throw Error()

      return albuns.filter(item => {
        if (String(item.artist["@key"]) === String(ARTIST_ID)) {
          return item
        }
      }) as IAlbum[]
    } catch {
      return {
        error: true,
      }
    }
  }

  const handleDeleteSong = async(data:ISong) => {
    setLoading(true)
    try {
      const responseMiddleware = await deleteAsset("song", data["@key"])

      if (/^(error)$/i.test(String(responseMiddleware))) throw Error()

      setSnackber({
        status: true,
        color: "success",
        message: "Música deleteda com sucesso!"
      })

      const responseGetListSongs = await middlewareGetData("song")

      if (/^(error)$/i.test(String(responseGetListSongs))) {
        setSnackber({
          status: true,
          color: "error",
          message: "Erro ao atualizar lista de músicas"
        })
        return
      }

      dispatch(setSong(responseGetListSongs as ISong[]))
      renderSongsArtist()
    } catch {
      setSnackber({
        status: true,
        color: "error",
        message: "Erro ao deletar a música"
      })
    } finally {
      setTimeout(() => {
        setSnackber({
          status: false,
          color: "",
          message: ""
        })
        setLoading(false)
      }, 5000)
    }
  }

  const mountedSongPlayerPlayer = () => {
    const DATA_UPDATE = mountedObjectPlaylist({
      albuns: albuns,
      artists: artists,
      songs: renderSongsArtist() as ISong[]
    })

    dispatch(setListSong(DATA_UPDATE))
    sessionStorage.removeItem("artist-selected"),
    dispatch(setDialogDetailArtist(!dialogDetailArtist))
  }


  return (
    <DialogComponent
      open={dialogDetailArtist}
      add="createAssets"
      type="album"
      close={() => (
        sessionStorage.removeItem("artist-selected"),
        setUpdateID(""),
        dispatch(setDialogDetailArtist(!dialogDetailArtist))
      )}
      title={renderDatailsArtist()?.title || `${renderDatailsArtist()?.name} - ${renderDatailsArtist()?.country}`}
    >
      {
        renderDatailsArtist()?.error ?
          renderDatailsArtist()?.description :
          <Container>
            <ContentSongs>
              {
                renderSongsArtist().error === true || renderSongsArtist().length === 0 ?
                  <>Sem Músicas</> : 
                  <>
                    <header>
                      <span>
                        Todas as musicas do artista
                      </span>

                      <button
                        onClick={() => (
                          mountedSongPlayerPlayer()
                        )}
                      >
                        <span>
                          Tocar agora
                        </span>

                        <img
                          src="/img/views/player/play.png"
                          alt={`Tocar todas as musicas do ${renderDatailsArtist()?.name} no player`}
                          title={`Tocar todas as musicas do ${renderDatailsArtist()?.name} no player`}
                        />
                      </button>
                    </header>

                    <ul>
                      {
                        renderSongsArtist().map((item) => (
                          <li
                            key={`list-song-${item["@key"]}-${item.name}`}
                          >
                            <span>
                              { item.name } -
                            </span>

                            <span>
                                { renderDetailAlbum(String(item.album["@key"])).name }
                            </span>

                            <div>
                              <button
                                disabled={loading || updateID !== ""}
                                onClick={() => (setUpdateID(item["@key"]))}
                              >
                                Editar
                              </button>

                              {
                                (updateID !== "" && updateID === item["@key"]) &&
                                <>
                                  <button
                                    onClick={() => (setUpdateID(""))}
                                  >
                                    Fechar
                                  </button>
                                  <FormUpdateAssets 
                                    data={item}
                                  />
                                </>
                              }

                              <button
                                disabled={loading || updateID !== ""}
                                onClick={() => (handleDeleteSong(item))}
                              >
                                { loading ? "Aguarde..." : "Remover" }
                              </button>
                            </div>
                          </li>
                        ))
                      }
                    </ul>
                  </>
              }
            </ContentSongs>
            
            {
              renderAlbum().length ?
                <ContentAlbums>
                  <span>
                    Todos os albuns
                  </span>
                  
                  <div
                    className="mobile-caroucel"
                  >
                    <CaroucelCardAlbum
                      slides={renderAlbum() as IAlbum[]}
                    />
                  </div>
                  
                  <ContentCardAlbum>
                    {
                      !("error" in renderAlbum()) &&
                        renderAlbum().map(item => (
                          <div
                            key={item["@key"]}
                          >
                            <CardAlbum
                              name={item.name}
                              id={item["@key"]}
                            />
                          </div>
                        ))
                    }
                  </ContentCardAlbum>
                </ContentAlbums> : "O artista não possui albuns"
            }
          </Container>
      }

      <Snackbar 
        open={snackbar.status}
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
    </DialogComponent>
  )
}