import { useState } from "react"
import { 
  Container,
  ContentForm,
  Form,
  Actions
} from "../../../styles/components/form/Update"

import { useSelector, useDispatch } from "react-redux"
import { updateAsset } from "../../../middlewares/middlewareServices"
import { middlewareGetData } from "../../../middlewares/middlewareGetData"
import { setSong, setAlbuns, setArtist } from "../../../plugins/store/modules/playlistModules"
import { RootState } from "../../../plugins/store"
import { IAlbum, IArtist, ISong } from "../../../types/assetsTypes"
import Alert from "@mui/material/Alert"
import Snackbar from "@mui/material/Snackbar"

interface ITypeForm {
  "name": string;
  "artist"?: {
    "@assetType"?: string,
    "@key"?: string
  };
  "song"?: {
    "@assetType"?: string,
    "@key"?: string
  };
  "album"?: {
    "@assetType"?: string,
    "@key"?: string
  };
  "playlist"?: {
    "@assetType"?: string,
    "@key"?: string
  };
  "country"?: string;
  "year"?: number
}


export default function FormUpdateAssets (props: any) {
  const [form, setForm] = useState({} as ITypeForm)
  const [ loading, setLoading ] = useState(false)
  const [ snackbar, setSnackber ] = useState({
    status: false,
    message: "",
    color: ""
  })

  const { albuns } = useSelector((state:RootState) => state.playlist)
  const dispatch = useDispatch()

  function readyAlbumArtist () {
    const CACHE_ID_ARTIST = sessionStorage.getItem("artist-selected")

    if (!CACHE_ID_ARTIST) return albuns

    return albuns.filter(album => {
      if (String(album.artist["@key"]) === String(CACHE_ID_ARTIST)) return album
    })
  }

  async function handleUpdate (event) {
    event.preventDefault()

    if (form.name === "") return

    setLoading(true)

    try {
      const responseUpdate = await updateAsset(
        props.data["@assetType"],
        props.data["@key"],
        form
      )

      if (/^(error)$/i.test(String(responseUpdate))) throw Error()
      
      const responseGetList = await middlewareGetData(String(props.data["@assetType"]))

      if (/^(error)$/i.test(String(responseGetList))) {
        setSnackber({
          status: true,
          color: "error",
          message: "Erro ao atualizar lista"
        })
        return
      }

      if (/^(song)$/i.test(String(props.data["@assetType"]))) {
        dispatch(setSong(responseGetList as ISong[]))
      }

      if (/^(artist)$/i.test(String(props.data["@assetType"]))) {
        dispatch(setArtist(responseGetList as IArtist[]))
      }

      if (/^(album)$/i.test(String(props.data["@assetType"]))) {
        dispatch(setAlbuns(responseGetList as IAlbum[]))
      }

      setSnackber({
        status: true,
        color: "success",
        message: "Atualizado com sucesso"
      })

    } catch {
      setSnackber({
        status: true,
        color: "error",
        message: `Erro ao atualizar ${props.data["@assetType"]}`
      })
    }finally {
      setTimeout(() => {
        setLoading(false)
        setSnackber({
          status: false,
          color: "",
          message: ""
        })
      }, 4000)
    }
  }

  return(
    <Container>
      <Form
        onSubmit={handleUpdate}
      >
        <ContentForm>
          <label htmlFor="name">
            name:
          </label>

          <input
            type="text"
            name="name"
            required
            id="name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </ContentForm>

        {
          /^(song)$/i.test(String(props.data["@assetType"])) &&
          <ContentForm>
            <label htmlFor="album">
              Selecione o album para mover:
            </label>

            <select 
              name="album" 
              id="album"
              required
              onChange={(e) => (
                setForm({ 
                  ...form,
                  album: {
                    "@assetType": "song",
                    "@key": e.target.value 
                  }
                })
              )}
            >
              {
                readyAlbumArtist().map(item => (
                  <option
                    key={item["@key"]}
                    value={item["@key"]}
                  >
                    {
                      item.name
                    }
                  </option>
                ))
              }
            </select>
          </ContentForm>
        }

        {
          /^(album)$/i.test(String(props.data["@assetType"])) &&
          <ContentForm>
          <label htmlFor="name">
            Ano:
          </label>

          <input
            type="tel"
            name="name"
            id="name"
            required
            onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
          />
        </ContentForm>
        }

        <Actions>
          {
            snackbar.status === true && 
              <span>
                { snackbar.message }
              </span>
          }

          <button
            type="submit"
            disabled={loading}
          >
            { loading ? "Aguarde..." : "Atualizar" }
          </button>
        </Actions>
      </Form>

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
  )
}