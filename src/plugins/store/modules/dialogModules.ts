import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { dialogInterface } from "../interface/dialogModule"


const moduleState: dialogInterface = {
  dialogCreatePlaylist: false,
  dialogListPlaylist: false,
  dialogPlaylist: false,
  dialogDetailArtist: false
}

export const dialogModule = createSlice({
  name: 'dialog',
  initialState: moduleState,
  reducers: {
    setDialogCreatePlaylist: (state: { dialogCreatePlaylist: boolean }, action: PayloadAction<boolean>) => {
      state.dialogCreatePlaylist = action.payload
    },
    setDialogPlaylist: (state: { dialogPlaylist: boolean }, action: PayloadAction<boolean>) => {
      state.dialogPlaylist = action.payload
    },
    setDialogListPlaylist: (state: { dialogListPlaylist: boolean }, action: PayloadAction<boolean>) => {
      state.dialogListPlaylist = action.payload
    },
    setDialogDetailArtist: (state: { dialogDetailArtist: boolean }, action: PayloadAction<boolean>) => {
      state.dialogDetailArtist = action.payload
    }
  },
})


export const {
  setDialogCreatePlaylist,
  setDialogPlaylist,
  setDialogListPlaylist,
  setDialogDetailArtist
} = dialogModule.actions

export default dialogModule.reducer