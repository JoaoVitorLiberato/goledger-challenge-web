import { FC } from "react";
import {
  Card,
  ContentImage,
  ImageArtirt,
  Data
} from "../../styles/components/cards/CardArtirts"

type ICard = {
  image?: string;
  name?: string,
  country?: string
}

const CardArtisrt: FC<ICard> = ({
  image,
  name,
  country
 }) => {
  return(
    <Card
      title={`Ouça agora ${name} e viaje para outro mundo.`}
    >
      <ContentImage>
        <ImageArtirt 
          src={image || "https://th.bing.com/th/id/OIP.rm4o2LZV2iOu83ECOsG-pwHaEm?rs=1&pid=ImgDetMain"}
          alt={`Ouça agora ${name} e viaje para outro mundo.`}
        />
      </ContentImage>

      <Data>
        <h4>{ name }</h4>
        <span>{ country }</span>
      </Data>
    </Card>
  )
}

export default CardArtisrt
