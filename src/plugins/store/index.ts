import { configureStore } from "@reduxjs/toolkit"
import paylistModuleReducer from "./modules/playlistModules"
import dialogModuleReducer from "./modules/dialogModules"

const store = configureStore({
  reducer: {
    playlist: paylistModuleReducer,
    dialog: dialogModuleReducer
  }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store