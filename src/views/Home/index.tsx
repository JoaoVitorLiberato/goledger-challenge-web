import { useEffect } from "react"
import { useDispatch } from "react-redux"
import Debounce from "lodash.debounce"
import { middlewareGetData } from "../../middlewares/middlewareGetData"
import { setAlbuns, setArtist, setSong, setPlaylist } from "../../plugins/store/modules/playlistModules"
import { IAlbum, IArtist, ISong, IPlaylist } from "../../types/assetsTypes"

import LayoutApp from "../../components/layout"
import Hero from "./Hero"
import Paylist from "./Paylist"
import Artists from "./Artirts"

import DialogCreatePlaylist from "../../components/dialogs/DialogCreatePlaylist"
import DialogPlaylist from "../../components/dialogs/DialogPlaylist"
import DialogDetailArtist from "../../components/dialogs/DialogDetaisArtist"

function HomeView () {
  const dispatch = useDispatch()

  useEffect(() => {
    getSerchAllData()
  })
  
  const getSerchAllData = Debounce(
    async function () {
      const [ playlist, artists, albums, songs] = await Promise.all([
        middlewareGetData("playlist"),
        middlewareGetData("artist"),
        middlewareGetData("album"),
        middlewareGetData("song"),
      ])

      dispatch(setPlaylist(playlist as IPlaylist[]))
      dispatch(setArtist(artists as IArtist[]))
      dispatch(setAlbuns(albums as IAlbum[]))
      dispatch(setSong(songs as ISong[]))
    },
    400
  )

  return(
    <LayoutApp>
      <Hero />
      <Paylist />
      <Artists />

      {/* componentes para execução de uma tarefa especifica */}
        <DialogCreatePlaylist />
        <DialogPlaylist />
        <DialogDetailArtist />
      {/* componentes para execução de uma tarefa especifica */}
    </LayoutApp>
  )
}


export default HomeView