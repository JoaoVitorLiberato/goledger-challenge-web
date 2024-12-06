import { useSelector } from "react-redux"
import { RootState } from "../../plugins/store"

import {
  Container,
  LimitationWidth,
  ContainterListSongs,
  ContainterDetailSong
} from "../../styles/views/home/playlist"

function Playlist () {
  const playlist = useSelector((state: RootState) => state.playlist)

  return(
    <Container>
      <LimitationWidth>
        <ContainterListSongs>
          <ul>
            {
              Object.keys(playlist.listSong).map((item) => (
                <li
                  title={`Ouça agora ${playlist.listSong[item].name} na Goledger Player`}
                  key={`li-${playlist.listSong[item]["@key"]}`}
                >
                  <span>
                    { playlist.listSong[item].name }
                  </span>

                  <button>
                    <img
                      src="/img/views/player/play.png"
                      alt="Images Button Player"
                    />
                  </button>
                  <button>
                    <img
                      src="/img/views/player/delete.png"
                      alt="Images Button Delete musica"
                    />
                  </button>
                </li>
              ))
            }
          </ul>
        </ContainterListSongs>

        <ContainterDetailSong>
          <div
            className="image_content"
          >
            <img
              src="https://th.bing.com/th/id/OIP.rm4o2LZV2iOu83ECOsG-pwHaEm?rs=1&pid=ImgDetMain"
              alt="Image album"
            />

            <span>
              2000
            </span>
          </div>

          <div
            className="detail_content"
          >
            <span>
              nome_musica 
            </span>

            <span>
              artista 
            </span>

            <span>
              album
            </span>
          </div>
        </ContainterDetailSong>
      </LimitationWidth>
    </Container>
  )
}

export default Playlist