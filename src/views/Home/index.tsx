import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setAlbuns, setArtist, setSong, setListSong } from "../../plugins/store/modules/playlistModules"
import Debounce from "lodash.debounce"
import { middlewareGetData } from "../../middlewares/middlewareGetData"
import { IAlbum, IArtist, ISong } from "../../types/assetsTypes"

import LayoutApp from "../../components/layout"
import Hero from "./Hero"
import Paylist from "./Paylist"
import Artists from "./Artirts"

function HomeView () {
  const dispatch = useDispatch()

  useEffect(() => {
    getSerchAllData()
  }, [])
  
  const getSerchAllData = Debounce(
    async function () {
      const PLAYLIST_SONG = new Set()

      const [ artists, albums, songs] = await Promise.all([
        middlewareGetData("artist"),
        middlewareGetData("album"),
        middlewareGetData("song"),
      ])

      const SONG_API_DATA = songs as ISong[]
      const ALBUM_API_DATA = albums as IAlbum[]
      const ARTIST_API_DATA =artists as IArtist[]

      SONG_API_DATA.forEach((song) => {
        ALBUM_API_DATA.find((album) => {
          ARTIST_API_DATA.find((artist) => {
            if (String(album["@key"]) === String(song.album["@key"])) {
              if (String(artist["@key"]) === String(album.artist["@key"])) {
                PLAYLIST_SONG.add({
                  [song["@key"]]: {
                    ...song,
                    datails: {
                      album: album,
                      artist: artist
                    }
                  }
                })
              }
            }
          })
        })
      })

      dispatch(setArtist(artists as IArtist[]))
      dispatch(setAlbuns(albums as IAlbum[]))
      dispatch(setSong(songs as ISong[]))
      dispatch(setListSong(Object.assign({}, ...PLAYLIST_SONG)))
    },
    400
  )

  return(
    <LayoutApp>
      <Hero />
      <Paylist />
      <Artists />
    </LayoutApp>
  )
}


export default HomeView