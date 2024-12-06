import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { playlistInterface } from "../interface/playlistModule"
import { 
  IAlbum,
  IArtist,
  ISong,
  IList
} from "../../../types/assetsTypes"

const moduleState: playlistInterface = {
  listSong: {},
  player: {
    status: "",
    song: {}
  },
  artists: [],
  albuns: [],
  songs: []
}

export const playlistModule = createSlice({
  name: 'playlist',
  initialState: moduleState,
  reducers: {
    setArtist: (state: { artists: IArtist[] }, action: PayloadAction<IArtist[]>) => {
      state.artists = action.payload
    },
    setAlbuns: (state: { albuns: IAlbum[] }, action: PayloadAction<IAlbum[]>) => {
      state.albuns = action.payload
    },
    setSong: (state: { songs: ISong[] }, action: PayloadAction<ISong[]>) => {
      state.songs = action.payload
    },
    setListSong: (state, action: PayloadAction<IList>) => {
      state.listSong = action.payload
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setPlayerSong: (state, action: PayloadAction<any>) => {
      state.player = action.payload
    },
  },
})


export const {
  setAlbuns,
  setArtist,
  setSong,
  setListSong,
  setPlayerSong,
} = playlistModule.actions

export default playlistModule.reducer