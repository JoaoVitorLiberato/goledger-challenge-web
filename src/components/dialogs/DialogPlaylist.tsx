import DialogComponent from "./DialogComponent"
import { useDispatch, useSelector } from "react-redux"
import { setDialogPlaylist } from "../../plugins/store/modules/dialogModules"
import { setListSong } from "../../plugins/store/modules/playlistModules"
import { RootState } from "../../plugins/store"
import { mountedObjectPlaylist } from "../../helpers/mountedObjectPlaylist"
import { useEffect } from "react"
import { ISong } from "../../types/assetsTypes"

import {
  Container,
  ListSongs,
  ContentPlayer,
  HeaderContentPlayer
} from "../../styles/components/dialogs/DialogPlaylist"

export default function DialogPlaylist () {
  const dispatch = useDispatch()
  const { dialogPlaylist } = useSelector((state: RootState) => state.dialog)
  const { songs, albuns, artists } = useSelector((state: RootState) => state.playlist)

  function renderData () {
    const CACHE_DATA = sessionStorage.getItem("playlist-selected")

    if (!CACHE_DATA) return false

    return JSON.parse(CACHE_DATA)
  }

  useEffect(() => {
    listSong()
  })

  function listSong () {
    const LIST_SONGS_CACHE = renderData().songs
    const SONG_UPDATE: ISong[] = []

    if (!LIST_SONGS_CACHE || LIST_SONGS_CACHE.length === 0) return []

    songs.filter((song) => {
      LIST_SONGS_CACHE.filter((cache) => {
        if (String(song["@key"]) === String(cache["@key"])) {
          SONG_UPDATE.push(song)
        }
      })
    })

    return SONG_UPDATE
  }

  function handleAddPlaylist () {
    const DATA_UPDATED = mountedObjectPlaylist({
      songs: listSong(),
      albuns: albuns,
      artists: artists
    })

    dispatch(setListSong(DATA_UPDATED))
  }

  return(
    <>
      {
        renderData() && 
          <DialogComponent
            title={renderData().name}
            open={dialogPlaylist}
            add="no"
            close={() => (
              sessionStorage.removeItem("playlist-selected"),
              dispatch(setDialogPlaylist(false))
            )}
          >
            <Container>
              <ContentPlayer>
                <HeaderContentPlayer>
                  <button
                    onClick={() => (handleAddPlaylist())}
                  >
                    Adicionar músicas ao Player
                  </button>
                </HeaderContentPlayer>
                {
                  listSong().length && 
                    <ListSongs>
                      {
                        listSong().map((item) => (
                          <li key={item["@key"]}>
                            { item.name }
                          </li>
                        ))
                      }
                    </ListSongs>
                }
              </ContentPlayer>
            </Container>
          </DialogComponent>
      }
    </>
  )
}