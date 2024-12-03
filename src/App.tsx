import RoutesApp from "./plugins/router"
import { Provider } from "react-redux"
import store from "./plugins/store"

function App() {

  return (
    <Provider store={store}>
      <RoutesApp />
    </Provider>
  )
}

export default App
