import { useSelector, useDispatch } from "react-redux"
import { setPlayerSong, setListSong } from "../../plugins/store/modules/playlistModules"
import { RootState } from "../../plugins/store"

import {
  Container,
  LimitationWidth,
  ContainterListSongs,
  ContainterDetailSong,
  ListSong,
  Song
  
} from "../../styles/views/home/playlist"
import { useState } from "react"

function Playlist () {
  const [ songId, setSongId ] = useState("")
  const dispatch = useDispatch()
  const { listSong, player } = useSelector((state: RootState) => state.playlist)

  function deleteSongPlayer () {
    const PLAYLIST = new Set()

    Object.keys(listSong).forEach((item) => {
      if (String(item) !== String(songId)) {
        PLAYLIST.add({
          [item]: listSong[item]
        })
      }
    })

    dispatch(setPlayerSong({
      status: "",
      song: {}
    }))

    dispatch(setListSong(Object.assign({}, ...PLAYLIST)))
  }

  return(
    <>
      {
        Object.keys(listSong).length ?
        <Container>
          <LimitationWidth>
            <ContainterListSongs>
              <ListSong>
                {
                  Object.keys(listSong).map((item) => (
                    <Song
                      title={`Ouça agora ${listSong[item].name} na Goledger Player`}
                      key={`li-${listSong[item]["@key"]}`}
                      bg={/^(active)$/i.test(String(player.status)) && String(player.song["@key"]) === String(item) ? "#00e7ff21" : ""}
                      onClick={() => (
                        setSongId(listSong[item]["@key"]),
                        dispatch(setPlayerSong({
                          status: "active",
                          song: listSong[item]
                        }))
                      )}
                    >
                      <span>
                        { listSong[item].name }
                      </span>

                      <button
                        onClick={() => (
                          setSongId(listSong[item]["@key"]),
                          dispatch(setPlayerSong({
                            status: "active",
                            song: listSong[item]
                          }))
                        )}
                      >
                        <img
                          src={`/img/views/player/${String(player.song["@key"]) === String(item) ? "pause" : "play"}.png`}
                          alt="Images Button Player"
                        />
                      </button>
                    </Song>
                  ))
                }
              </ListSong>
            </ContainterListSongs>

            {
              player.song.name ?
                <ContainterDetailSong>
                  <div
                    className="image_content"
                  >
                    <img
                      src="https://th.bing.com/th/id/OIP.rm4o2LZV2iOu83ECOsG-pwHaEm?rs=1&pid=ImgDetMain"
                      alt="Image album"
                    />
                  </div>

                  <div
                    className="detail_content"
                  >
                    <div className="detail_content-song">
                      <div>
                        <strong>Nome da música</strong>:
                        <span>
                          { player.song.name }
                        </span>
                      </div>

                      <div>
                        <strong>Artista:</strong>
                        <span>
                          { player.song.details.artist.name} 
                        </span>
                      </div>

                      <div>
                        <strong>Album:</strong>
                        <span>
                          { player.song.details.album.name }
                        </span>
                      </div>

                      <div>
                        <strong>Ano:</strong>
                        <span>
                          { new Date().toLocaleDateString(player.song.details.album.year) }
                        </span>
                      </div>
                    </div>

                    <div
                      className="detail_content-action"
                    >
                      <button
                        className="detail_content-action-stop"
                        onClick={() => (
                          dispatch(setPlayerSong({
                            status: "",
                            song: {}
                          }))
                        )}
                      >
                        Parar
                      </button>

                      <button
                        className="detail_content-action-delete"
                        onClick={deleteSongPlayer}
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                </ContainterDetailSong> :
                <img
                  src="/img/views/player/Music-amico.png"
                  alt="Escute suas músicas favoritas aqui."
                  className="image_player_desatived"
                />
            }
          </LimitationWidth>
        </Container> : ""
      }
    </>
  )
}

export default Playlist