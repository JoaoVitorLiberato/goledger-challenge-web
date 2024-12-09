import { useState, FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setAlbuns } from "../../plugins/store/modules/playlistModules"
import { setDialogDetailAlbum } from "../../plugins/store/modules/dialogModules"
import { RootState } from "../../plugins/store"

import { deleteAsset } from "../../middlewares/middlewareServices"
import { middlewareGetData } from "../../middlewares/middlewareGetData"
import { IAlbum  } from "../../types/assetsTypes"

import {
  Container,
  Title,
  Card,
  Actions,
} from "../../styles/components/cards/CardAlbum"

interface ICardAlbum {
  name: string;
  id: string;
}

const CardAlbum: FC<ICardAlbum> = ({ name, id }) => {
  const [loading, setLoading] = useState(false);
  const [ snackbar, setSnackber ] = useState({
    status: false,
    message: "",
    color: ""
  })

  const { dialogDetailAlbum } = useSelector((state:RootState) => state.dialog)

  const dispatch = useDispatch()

  async function handleDeleteAlbum () {
    if (!id) {
      setSnackber({
        status: true,
        color: "#e95f5f",
        message: "Sem chave"
      })
      return
    }

    setLoading(true)

    try {
      const responseMiddleware = await deleteAsset("album", id)
      if (/error/i.test(responseMiddleware as string)) throw Error()
      
      setSnackber({
        status: true,
        color: "#42ff42",
        message: "Album apagado com sucesso!"
      })

      const responseGetListAlbuns = await middlewareGetData("album")
      if (/^(error)$/i.test(String(responseGetListAlbuns))) {
        setSnackber({
          status: true,
          color: "#e95f5f",
          message: "Erro ao atualizar lista do album"
        })
        return
      }

      dispatch(setAlbuns(responseGetListAlbuns as IAlbum[]))
    } catch {
      setSnackber({
        status: true,
        color: "#e95f5f",
        message: "Erro ao apagar o album."
      })
    } finally {
      setTimeout(() => {
        setSnackber({
          status: false,
          color: "",
          message: ""
        })
        setLoading(false)
      }, 3500)
    }
  }

  return(
    <Container>
        <Title>
          { name }
        </Title>

        <Actions>
          <button
            disabled={loading}
            onClick={() => (
              sessionStorage.setItem("album-data", id),
              dispatch(setDialogDetailAlbum(!dialogDetailAlbum))
            )}
          >
            Detalhes
          </button>

          <button
            disabled={loading}
            onClick={handleDeleteAlbum}
          >
            { loading ? "Aguarde..." : "Deletar" }
          </button>
        </Actions>

      {
        snackbar.status ?
          <Card
            bg={snackbar.color}
          >
            <span>
              { snackbar.message }
            </span>
          </Card> : ""
      }
    </Container>
  )
}

export default CardAlbum
