import React from "react";

export interface IChildren {
  children: React.ReactNode
}

export interface Slide {
  name?:string;
  image?:string;
  category?:string;
}

export interface CarouselProps {
  slides: Slide[];
}
