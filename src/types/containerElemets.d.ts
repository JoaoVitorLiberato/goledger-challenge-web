import React from "react";
import { IPlaylist } from "./assetsTypes"

export interface IChildren {
  children: React.ReactNode
}

export interface Slide {
  name?:string;
  image?:string;
  category?:string;
  "@key": string;
}

export interface CarouselProps {
  slides: Slide[];
}
export interface CarouselPlaylistProps {
  slides: IPlaylist[];
}
