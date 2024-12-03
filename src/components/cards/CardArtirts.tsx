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
  category?: string
}

const CardArtirts: FC<ICard> = ({
  image,
  name,
  category
 }) => {
  return(
    <Card
      title={`Ouça agora ${name} e viaje para outro mundo.`}
    >
      <ContentImage>
        <ImageArtirt 
          src={image}
          alt={`Ouça agora ${name} e viaje para outro mundo.`}
        />
      </ContentImage>

      <Data>
        <h4>{ name }</h4>
        <span>{ category }</span>
      </Data>
    </Card>
  )
}

export default CardArtirts
