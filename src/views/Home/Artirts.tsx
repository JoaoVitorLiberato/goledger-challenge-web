import CardArtirts from "../../components/cards/CardArtirts"
import {
  Container,
  LimitationWidth,
  CardsContainer,
  Title
} from "../../styles/views/home/artirts"

function Artirts () {
  const JSON_FAKE_ARTISTAS = [
    {
      name: "Henrique & Juliano",
      image: "https://odia.ig.com.br/_midias/jpg/2022/05/19/1200x750/1_dupla_1_teste-25242667.jpg",
      category: "sertanejo",
    },
    {
      name: "Matheus & Kauã",
      image: "https://th.bing.com/th/id/OIP.W5I1asMrDm-ll9BYLR6bWQHaE1?rs=1&pid=ImgDetMain",
      category: "sertanejo",
    },
    {
      name: "Jorge & Matheus",
      image: "https://odia.ig.com.br/_midias/jpg/2020/04/02/jorge_e_mateus-16522500.jpg?20201213203854",
      category: "sertanejo",
    },
    {
      name: "Gustavo Lima",
      image: "https://lastfm.freetls.fastly.net/i/u/ar0/bd5a68d0d93a0caf6a5d21bb568bd5df.jpg",
      category: "sertanejo",
    }
  ]

  return (
    <Container>
      <LimitationWidth>
        <Title>
          Artistas populares
        </Title>

        <CardsContainer>
          {
            JSON_FAKE_ARTISTAS.map((item) => (
              <CardArtirts
                image={item.image}
                name={item.name}
                category={item.category}
                key={item.name}
              />
            ))
          }
        </CardsContainer>
      </LimitationWidth>
    </Container>
  )
}

export default Artirts
