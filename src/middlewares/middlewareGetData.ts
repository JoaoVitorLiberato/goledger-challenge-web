import { middlewareServiceApi } from "./middlewareServiceApi"
import { 
  IAlbum,
  IArtist,
  ISong
} from "../types/assetsTypes"

export const middlewareGetData = (type:string): Promise<IAlbum[]|IArtist[]|ISong[]|string> => {
  return new Promise((resolve, reject) => {
    middlewareServiceApi
      .post("/query/search", {
        "query": {
          "selector": {
            "@assetType": type
          }
        }
    })
      .then((responseService) => {
        if (!("data" in responseService)) reject(Error("not-data"))
        resolve(responseService.data.result)
      })
      .catch((error) => {
        console.log("error", error)
        resolve("error")
      })
  })
}