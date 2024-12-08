import DialogComponent from "./DialogComponent"
import { useDispatch, useSelector } from "react-redux"
import { createAsset } from "../../middlewares/middlewareServices"
import { setDialogCreatePlaylist } from "../../plugins/store/modules/dialogModules"
import { RootState } from '../../plugins/store'

import TextField from "@mui/material/TextField"

import {
  ConatinerForm,
  ContentSongs,
  ContentSongsList
} from "../../styles/components/dialogs/DialogCreatePlaylist"
import { useState } from "react"
import Snackbar from "@mui/material/Snackbar/Snackbar"
import Alert from "@mui/material/Alert"

interface ITypesSong {
  "@assetType"?: string,
  "@key": string
}

const DialogCreatePlaylist = () => {
  const [ loading, setLoading ] = useState(false)
  const [ errorTxt, setErrorTxt ] = useState("")
  const [ dataForm, setDataForm ] = useState({
    name: "",
    private: false,
    songs: [] as ITypesSong[]
  })
  const [ snackbar, setSnackber ] = useState({
    status: false,
    message: "",
    color: ""
  })

  const dispatch = useDispatch()
  const { dialogCreatePlaylist } = useSelector((state: RootState) => state.dialog)
  const { songs } = useSelector((state: RootState) => state.playlist)


  function setSongDataForm (item:ITypesSong) {
    const SONG_FILTERED = dataForm.songs.filter(song => {
      if (song["@key"] === item["@key"]) return song
    })

    if (SONG_FILTERED.length > 0) {
      setDataForm({
        ...dataForm,
        songs: dataForm.songs.filter(song => {
          if (song["@key"] !== item["@key"]) return song
        })
      })

      return
    }

    setDataForm({
      ...dataForm,
      songs: [
        ...dataForm.songs,
        {
          "@assetType": "song",
          "@key": item["@key"]
        }
      ]
    })
  }

  function verifyAddedSongs (key:string) {
    const retorno = {
      bg: "",
      msg: ""
    }

    dataForm.songs.forEach((_, index) => {
      if (String(dataForm.songs[index]["@key"]) === String(key)) {
        retorno.bg = "#00e7ff21"
        retorno.msg = "ok"
      }
    })

    return retorno
  }

  function handleCreatePlaylist (event: React.FormEvent<HTMLFormElement>): void {
    event.stopPropagation()
    event.preventDefault()

    if (dataForm.name === "") {
      setErrorTxt("Obrigatório")
      setTimeout(() => { setErrorTxt("") }, 6000)
      return
    }

    setLoading(true)

    createAsset("playlist", dataForm)
      .then(responseMiddleware => {
        if (/error/i.test(String(responseMiddleware))) throw Error("Middleware not found")

        const CACHE_KEY_PLAYLIST = localStorage.getItem("playlist-keys")

        if (CACHE_KEY_PLAYLIST) {
          localStorage.setItem("playlist-keys", JSON.stringify([
            ...JSON.parse(CACHE_KEY_PLAYLIST),
            String(responseMiddleware)
          ]))
        } else {
          localStorage.setItem("playlist-keys", JSON.stringify([responseMiddleware]))
        }

        setSnackber({
          status: true,
          color: "success",
          message: "Playlist criada com sucesso!"
        })
      }).catch(error => {
        console.log("error", error)

        setSnackber({
          status: true,
          color: "error",
          message: "Erro ao criar uma playlist"
        })
      }).finally(() => {
        setTimeout(() => {
          setSnackber({
            status: false,
            color: "",
            message: ""
          })
          dispatch(setDialogCreatePlaylist(false))
          setLoading(false)
          setDataForm({
            name: "",
            private: false,
            songs: [] as ITypesSong[]
          })
        }, 5000)
      })
  }

  return(
    <DialogComponent
      add="no"
      title="Criar Playlist"
      open={dialogCreatePlaylist}
      close={() => (
        dispatch(setDialogCreatePlaylist(false))
      )}
    >
      <ConatinerForm
        onSubmit={handleCreatePlaylist}
      >
        <div>
          <TextField
            label="Nome da Playlist"
            placeholder="Informe no nome da sua playlist para procurar"
            color="warning"
            variant="outlined"
            required
            onChange={(e) => setDataForm({...dataForm, name: e.target.value})}
          />

          {
            errorTxt !== "" &&
            <span
              className="error--text"
            >
              { errorTxt }
            </span>
          }
        </div>

        <ContentSongs>
          <span>
            Adicione suas músicas predilétas na sua playlist
          </span>

          <div>
            <ul>
              {
                songs.map((item) => (
                  <ContentSongsList
                    key={item["@key"]}
                    onClick={() => (setSongDataForm(item))}
                    bg={verifyAddedSongs(item["@key"]).bg}
                  >
                    <span>
                      { item.name }
                    </span>

                    <span>
                      { verifyAddedSongs(item["@key"]).msg }
                    </span>
                  </ContentSongsList>
                ))
              }
            </ul>
          </div>
        </ContentSongs>

        <div
          className="fix-checkbox"
        >
          <input
            type="checkbox"
            id="private" 
            name="private" 
            value="Bike"
            onChange={() => (
              setDataForm({ ...dataForm, private: !dataForm.private })
            )}
          />

          <label htmlFor="private">
            Desejo que a playlist seja privada
          </label>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
          >
            { loading ? "Aguarde..." : "Criar Playlist" }
          </button>
        </div>
      </ConatinerForm>

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
    </DialogComponent>
  )
}

export default DialogCreatePlaylist