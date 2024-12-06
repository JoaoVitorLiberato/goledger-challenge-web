import { configureStore } from "@reduxjs/toolkit"
import paylistModuleReducer from "./modules/playlistModules"

const store = configureStore({
  reducer: {
    playlist: paylistModuleReducer,
  }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store