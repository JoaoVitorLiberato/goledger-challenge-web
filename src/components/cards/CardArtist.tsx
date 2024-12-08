import { FC, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setDialogDetailArtist } from "../../plugins/store/modules/dialogModules"
import { setArtist } from "../../plugins/store/modules/playlistModules"
import { RootState } from "../../plugins/store"
import {
  Card,
  ContentImage,
  ImageArtirt,
  Data,
  Actions
} from "../../styles/components/cards/CardArtirts"
import { deleteAsset } from "../../middlewares/middlewareServices"
import { middlewareGetData } from "../../middlewares/middlewareGetData"

import Snackbar from "@mui/material/Snackbar/Snackbar"
import Alert from "@mui/material/Alert"
import { IArtist } from "../../types/assetsTypes"

type ICard = {
  image?: string;
  name?: string,
  country?: string;
  id?:string
}

const CardArtisrt: FC<ICard> = ({
  image,
  name,
  country,
  id
}) => {
  const [loading, setLoading] = useState(false);
  const [ snackbar, setSnackber ] = useState({
    status: false,
    message: "",
    color: ""
  })

  const dispatch = useDispatch()
  const { dialogDetailArtist } = useSelector((state: RootState) => state.dialog)

  async function handleDeleteArtist () {
    if (!id) {
      setSnackber({
        status: true,
        color: "warning",
        message: "Sem chave"
      })
      return
    }

    setLoading(true)

    try {
      const responseMiddleware = await deleteAsset("artist", id)
      if (/error/i.test(responseMiddleware as string)) throw Error()
      
      setSnackber({
        status: true,
        color: "sucesso",
        message: "Artista apagado com sucesso!"
      })

      const responseGetListArtist = await middlewareGetData("artist")
      if (/^(error)$/i.test(String(responseGetListArtist))) {
        setSnackber({
          status: true,
          color: "error",
          message: "Erro ao atualizar lista do artista"
        })
        return
      }

      dispatch(setArtist(responseGetListArtist as IArtist[]))
    } catch {
      setSnackber({
        status: true,
        color: "error",
        message: "Erro ao apagar o artista."
      })
    } finally {
      setLoading(false)
    }
  }

  return(
    <Card
      title={`Ouça agora ${name} e viaje para outro mundo.`}
    >
      <ContentImage>
        <ImageArtirt 
          src={image || "https://th.bing.com/th/id/OIP.rm4o2LZV2iOu83ECOsG-pwHaEm?rs=1&pid=ImgDetMain"}
          alt={`Ouça agora ${name} e viaje para outro mundo.`}
        />
      </ContentImage>

      <Data>
        <h4>{ name }</h4>
      </Data>

      <Actions>
        <button
          disabled={loading}
          onClick={() => (
            sessionStorage.setItem("artist-selected", id as string),
            dispatch(setDialogDetailArtist(!dialogDetailArtist))
          )}
        >
          Ver Detalhes
        </button>

        <button
          disabled={loading}
          onClick={handleDeleteArtist}
        >
          { loading ? "Aguarde..." : "Excluir" }
        </button>
      </Actions>

      <Snackbar 
        open={snackbar.status} 
        autoHideDuration={3000} 
        onClose={() => setSnackber({ ...snackbar, status: !snackbar.status })}
      >
        <Alert
          onClose={() => setSnackber({ ...snackbar, status: !snackbar.status })}
          severity={snackbar.color}
          variant="filled"
          sx={{ maxWidth: '500px', fontSize: '12px', textAlign: 'right' }}
        >
          { snackbar.message }
        </Alert>
      </Snackbar>
    </Card>
  )
}

export default CardArtisrt
