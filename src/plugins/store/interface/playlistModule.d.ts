import { 
  IAlbum,
  IArtist,
  ISong
} from "../../../types/assetsTypes"

interface playlistInterface {
  artists: IArtist[]
  albuns: IAlbum[]
  songs: ISong[]
  listSong: {
    [key:string]: Record<string, string, string[], number, boolean>
  }
  player: {
    status: "",
    song: Record<string, string, string[], number, boolean>
  },
}

export {
  playlistInterface
}
