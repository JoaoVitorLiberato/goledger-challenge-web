import axios from "axios"

const connect = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVICE_API,
  auth: {
    username: import.meta.env.VITE_APP_SERVICE_ADMIN,
    password: import.meta.env.VITE_APP_SERVICE_PASSWORD
  },
  headers: {
    "Content-Type": "application/json"
  }
})

export {
  connect as middlewareServiceApi
}