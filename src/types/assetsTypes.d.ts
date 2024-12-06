export interface IAlbum {
  "@assetType": string,
  "@key": string,
  "@lastTouchBy": string,
  "@lastTx": string,
  "@lastUpdated": Date|string,
  "_isDelete"?: boolean,
  "_timestamp"?: Date|string,
  "_txId"?: string,
  "artist": {
    "@assetType": string,
    "@key": string
  },
  "name": string
}

export interface ISong {
  "@assetType": string,
  "@key": string,
  "@lastTouchBy": string,
  "@lastTx": string,
  "@lastUpdated": Date|string,
  "_isDelete"?: boolean,
  "_timestamp"?: Date|string,
  "_txId"?: string,
  "album": {
    "@assetType": string,
    "@key": string
  },
  "name": string
}

export interface IArtist {
  "@assetType": string,
  "@key": string,
  "@lastTouchBy": string,
  "@lastTx": string,
  "@lastUpdated": Date|string,
  "_isDelete"?: boolean,
  "_timestamp"?: Date|string,
  "_txId"?: string,
  "artist": {
    "@assetType": string,
    "@key": string
  },
  "name": string
  "country"?: string
}

export interface IList {
  ISong,
  details: {
    album: IAlbum,
    artist: IArtist
  }
}


