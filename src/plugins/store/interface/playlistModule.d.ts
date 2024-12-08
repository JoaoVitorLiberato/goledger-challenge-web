import { 
  IAlbum,
  IArtist,
  ISong,
  IPlaylist,
} from "../../../types/assetsTypes"

interface playlistInterface {
  artists: IArtist[];
  albuns: IAlbum[];
  songs: ISong[];
  playlist: IPlaylist[];
  listSong: {
    [key:string]: Record<string, string, string[], number, boolean>;
  };
  player: {
    status: "";
    song: Record<string, string, string[], number, boolean>;
  };
}

export {
  playlistInterface
}
