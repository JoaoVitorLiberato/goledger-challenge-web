import { FC, useState, useEffect } from "react"
import DialogComponent from "./DialogComponent"
import { useDispatch } from "react-redux"
import { createAsset } from "../../middlewares/middlewareServices"
import { middlewareGetData } from "../../middlewares/middlewareGetData"

import { 
  Actions,
  Container,
  ContentForm,
  Form
} from "../../styles/components/dialogs/DialogCreateAsset"

import { IAlbum, IArtist, ISong } from "../../types/assetsTypes"
import { setAlbuns, setArtist, setSong } from "../../plugins/store/modules/playlistModules"
import { Alert, Snackbar } from "@mui/material"

interface IAssets {
  name: string,
  type: string,
  id?: string,
}

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
  country?: string;
  year?: number
}

const DialogCreatedAssets: FC<IAssets> = ({ name , type }) => {
  const [ openDialog, setOpenDialog ] = useState(false)
  const [form, setForm] = useState({} as ITypeForm)
  const [ loading, setLoading ] = useState(false)
  const [ snackbar, setSnackber ] = useState({
    status: false,
    message: "",
    color: ""
  })

  const dispatch = useDispatch()

  useEffect(() => {
    if (/^(album)$/i.test(String(type))) {
      const ID_ARTIST = sessionStorage.getItem("artist-selected")

      if (!ID_ARTIST) throw Error()

      setForm({
        ...form,
        artist: {
          "@assetType": "artist",
          "@key": ID_ARTIST as string
        }
      })
    }

    if (/^(song)$/i.test(String(type))) {
      const ID_ALBUM = sessionStorage.getItem("album-data")

      if (!ID_ALBUM) throw Error()

      setForm({
        ...form,
        album: {
          "@assetType": "album",
          "@key": ID_ALBUM as string
        }
      })
    }
  }, [loading, openDialog])

  async function handleCreateAsset (event: Event) {
    event.preventDefault()

    if (form.name === "") return

    setLoading(true)

    try {
      const responseUpdate = await createAsset(
        type,
        form
      )

      if (/^(error)$/i.test(String(responseUpdate))) throw Error()
      
      const responseGetList = await middlewareGetData(String(type))

      if (/^(error)$/i.test(String(responseGetList))) {
        setSnackber({
          status: true,
          color: "error",
          message: "Erro ao atualizar lista"
        })
        return
      }

      if (/^(song)$/i.test(String(type))) {
        dispatch(setSong(responseGetList as ISong[]))
      }

      if (/^(artist)$/i.test(String(type))) {
        dispatch(setArtist(responseGetList as IArtist[]))
      }

      if (/^(album)$/i.test(String(type))) {
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
        message: `Erro ao atualizar ${type}`
      })
    }finally {
      setTimeout(() => {
        setLoading(false)
        setSnackber({
          status: false,
          color: "",
          message: ""
        })
        setOpenDialog(false)
      }, 4000)
    }
  }

  return(
    <Container>
      <button
        onClick={() => (
          setOpenDialog(!openDialog)
        )}
      >
        Criar { name }
      </button>

      <DialogComponent
        add="no"
        open={openDialog}
        title={`Criar ${name}`}
        close={() => (
          setOpenDialog(!openDialog)
        )}
      >
        <Form
          onSubmit={(e:Event) => handleCreateAsset(e)}
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
            /^(artist)$/i.test(String(type)) &&
            <ContentForm>
            <label htmlFor="country">
              País:
            </label>

            <input
              type="text"
              name="country"
              id="country"
              placeholder="ex. EUA"
              onChange={(e) => setForm({ ...form, country: String(e.target.value) })}
            />
          </ContentForm>
          }

          {
            /^(album)$/i.test(String(type)) &&
            <ContentForm>
            <label htmlFor="year">
              Ano:
            </label>

            <input
              type="tel"
              name="year"
              id="year"
              placeholder="ex. 2024"
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
              { loading ? "Aguarde..." : `Criar ${name}` }
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
      </DialogComponent>
    </Container>
  )
}

export default DialogCreatedAssets