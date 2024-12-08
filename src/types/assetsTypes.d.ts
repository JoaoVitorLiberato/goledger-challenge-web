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


export interface IPlaylist {
  "@assetType": string,
  "@key": string,
  "@lastTouchBy": string,
  "@lastTx": string,
  "@lastUpdated": Date|string,
  "_isDelete"?: boolean,
  "_timestamp"?: Date|string,
  "_txId"?: string,
  "private": boolean,
  "name": string
  "songs": Array<{
    "@assetType": string,
    "@key": string
  }>
}



export interface IList {
  "@assetType": string,
  "@key": string,
  "@lastTouchBy": string,
  "@lastTx": string,
  "@lastUpdated": Date|string,
  "_isDelete"?: boolean,
  "_timestamp"?: Date|string,
  "_txId"?: string,
  "name": string
  details: {
    album: IAlbum,
    artist: IArtist
  }
}


