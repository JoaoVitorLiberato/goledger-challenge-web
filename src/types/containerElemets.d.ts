import React from "react";

export interface IChildren {
  children: React.ReactNode
}

export interface Slide {
  name?:string;
  image?:string;
  country?:string;
}

export interface CarouselProps {
  slides: Slide[];
}
