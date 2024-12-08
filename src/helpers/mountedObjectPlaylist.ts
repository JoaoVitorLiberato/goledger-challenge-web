import { ISong, IAlbum, IArtist } from "../types/assetsTypes"


export function mountedObjectPlaylist (data: {
  songs:ISong[],
  albuns: IAlbum[],
  artists: IArtist[]
}) {
  const SONG_API_DATA = data.songs as ISong[]
  const ALBUM_API_DATA = data.albuns
  const ARTIST_API_DATA = data.artists
  const PLAYLIST_SONG = new Set()

  SONG_API_DATA.forEach((song) => {
    ALBUM_API_DATA.find((album) => {
      ARTIST_API_DATA.find((artist) => {
        if (String(album["@key"]) === String(song.album["@key"])) {
          if (String(artist["@key"]) === String(album.artist["@key"])) {
            PLAYLIST_SONG.add({
              [song["@key"]]: {
                ...song,
                details: {
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

  return Object.assign({}, ...PLAYLIST_SONG)
}