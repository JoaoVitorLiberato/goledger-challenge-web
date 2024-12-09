import DialogComponent from "./DialogComponent"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../plugins/store"
import { setDialogDetailAlbum, setDialogDetailArtist } from "../../plugins/store/modules/dialogModules"
import { IAlbum, ISong } from "../../types/assetsTypes"

import {
  Container,
  ContentSong,
  ContentUpdate
} from "../../styles/components/dialogs/DialogDetailAlbum"
import { useState } from "react"
import { setListSong, setSong } from "../../plugins/store/modules/playlistModules"
import { middlewareGetData } from "../../middlewares/middlewareGetData"
import FormUpdateAssets from "../form/update/FormUpdateAssets"
import { deleteAsset } from "../../middlewares/middlewareServices"
import { Alert, Snackbar } from "@mui/material"
import { mountedObjectPlaylist } from "../../helpers/mountedObjectPlaylist"

export default function DialogDetailsAlbum () {
  const [ updateID, setUpdateID ] = useState("")
  const [ loading, setLoading ] = useState(false)
  const [ snackbar, setSnackber ] = useState({
    status: false,
    message: "",
    color: ""
  })


  const { dialogDetailAlbum } = useSelector((state:RootState) => state.dialog)
  const { albuns, songs, artists } = useSelector((state:RootState) => state.playlist)
  const dispatch = useDispatch()

  const renderDetailAlbum = () => {
    const ALBUM_ID = sessionStorage.getItem("album-data")
    if (!ALBUM_ID) return {
      name: ""
    }

    const FIND_ALBUM = albuns.find(item => {
      if (String(item["@key"]) === String(ALBUM_ID)) return item
    }) as IAlbum

    if (!FIND_ALBUM) return {
      name: ""
    }

    return FIND_ALBUM
  }

  const renderSongsAlbum = () => {
    try {
      const ALBUM_ID = sessionStorage.getItem("album-data")
      if (!ALBUM_ID) throw Error()
    

      return songs.filter((song) => {
        if (String(song.album["@key"]) === String(ALBUM_ID)) {
          return song
        }
      }) as ISong[]
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
      renderSongsAlbum()
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
      songs: renderSongsAlbum() as ISong[]
    })

    dispatch(setListSong(DATA_UPDATE))
    sessionStorage.removeItem("album-data"),
    sessionStorage.removeItem("artist-selected"),
    dispatch(setDialogDetailAlbum(!dialogDetailAlbum))
    dispatch(setDialogDetailArtist(!setDialogDetailArtist))
  }

  return(
    <DialogComponent
      open={dialogDetailAlbum}
      add="createAssets"
      type="song"
      title={renderDetailAlbum().name || "Album"}
      close={() => (
        sessionStorage.removeItem("album-data"),
        dispatch(setDialogDetailAlbum(!dialogDetailAlbum))
      )}
    >
      {
        renderDetailAlbum().name === "" ? "Album vazio" :
        <Container>
          <ContentSong>
            {
              renderSongsAlbum().error || renderSongsAlbum().length === 0 ? 
                <>Sem Músicas</> : 
                <>
                  <header>
                    <span>
                      Tocar musicas dos album
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
                        alt={`Tocar todas as musicas do ${renderDetailAlbum()?.name} no player`}
                        title={`Tocar todas as musicas do ${renderDetailAlbum()?.name} no player`}
                      />
                    </button>
                  </header>

                  <ul>
                    {
                      renderSongsAlbum().map((item) => (
                        <li
                          key={`list-song-${item["@key"]}-${item.name}`}
                        >
                          <span>
                            { item.name }
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
          </ContentSong>

          <ContentUpdate>
            {
              renderDetailAlbum().name !== "" ?
              <FormUpdateAssets 
                data={renderDetailAlbum()}
              /> : ""
            }
          </ContentUpdate>

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
        </Container>
      }
    </DialogComponent>
  )
}