import { middlewareServiceApi } from "./middlewareServiceApi"

export const createAsset = async (type:string, data:any) => {
  return new Promise((resolve, reject) => {
    middlewareServiceApi.post("/invoke/createAsset", {
      "asset": [
        {
          "@assetType": type,
          ...data
        }
      ]
    })
      .then((responseMiddleware) => {
        if (!("data" in responseMiddleware)) reject("data-not-found")
        resolve(responseMiddleware.data[0]["@key"])
      }).catch((error) => {
        console.log("error createAsset-middleware", error)
        resolve("error")
      })
  })
}

export const deleteAsset = async (type:string, key:string) => {
  return new Promise((resolve, reject) => {
    middlewareServiceApi.post("/invoke/deleteAsset", {
      "key": {
        "@assetType": type,
        "@key": key
      }
    })
      .then((responseMiddleware) => {
        if (!("data" in responseMiddleware)) reject("data-not-found")
        resolve(responseMiddleware.data["@key"])
      }).catch((error) => {
        console.log("error createAsset-middleware", error)
        resolve("error")
      })
  })
}

export const updateAsset = async (type:string, key:string, data:any) => {
  return new Promise((resolve, reject) => {
    middlewareServiceApi.post("/invoke/updateAsset", {
      "update": {
        "@assetType": type,
        "@key": key,
        ...data
      }
    })
      .then((responseMiddleware) => {
        if (!("data" in responseMiddleware)) reject("data-not-found")
        resolve(responseMiddleware.data["@key"])
      }).catch((error) => {
        console.log("error createAsset-middleware", error)
        resolve("error")
      })
  })
}