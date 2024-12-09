import { useSelector } from "react-redux"
import { RootState } from "../../plugins/store"
import CardArtist from "../../components/cards/CardArtist"
import CaroucelCardsArtists from "../../components/caroucel/CaroucelCardsArtirts"
import {
  Container,
  LimitationWidth,
  CardsContainer,
  CardsContainerMobile,
  Title,
  Action
} from "../../styles/views/home/artirts"
import DialogCreatedAssets from "../../components/dialogs/DialogCreateAssets"

function Artists () {
  const { artists } = useSelector((state: RootState) => state.playlist)

  return (
    <Container>
      <LimitationWidth>
        <Title>
          Alguns artista populares
        </Title>

        <CardsContainer>
          {
            (artists).slice(0, 8).map((item) => (
              <CardArtist
                id={item["@key"]}
                name={item.name}
                country={item.country}
                key={`card-artist-${item.name}-${item["@lastTouchBy"]}${Math.random()}`}
              />
            ))
          }
        </CardsContainer>

        <CardsContainerMobile>
          <CaroucelCardsArtists
            slides={artists}
          />
        </CardsContainerMobile>

        <Action>
          <DialogCreatedAssets
            name="Artista"
            type="artist"
          />
        </Action>
      </LimitationWidth>
    </Container>
  )
}

export default Artists
