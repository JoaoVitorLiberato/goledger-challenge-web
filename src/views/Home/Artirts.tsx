import { useSelector } from "react-redux"
import { RootState } from "../../plugins/store"
import CardArtist from "../../components/cards/CardArtist"
import CaroucelCardsArtists from "../../components/caroucel/CaroucelCardsArtirts"
import {
  Container,
  LimitationWidth,
  CardsContainer,
  CardsContainerMobile,
  Title
} from "../../styles/views/home/artirts"

function Artists () {
  const { artists } = useSelector((state: RootState) => state.playlist)

  return (
    <Container>
      <LimitationWidth>
        <Title>
          Alguns artistas
        </Title>

        <CardsContainer>
          {
            artists.map((item) => (
              <CardArtist
                name={item.name}
                country={item.country}
                key={`card-artist-${item.name}-${item["@lastTouchBy"]}`}
              />
            ))
          }
        </CardsContainer>

        <CardsContainerMobile>
          <CaroucelCardsArtists
            slides={artists}
          />
        </CardsContainerMobile>
      </LimitationWidth>
    </Container>
  )
}

export default Artists
