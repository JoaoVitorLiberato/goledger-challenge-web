import {
  Container,
  LimitationWidth,
  Session,
  Button,
  ImageModel
} from "../../styles/views/home/hero"

function Hero () {

  return (
    <Container>
      <LimitationWidth>
        <Session>
          <h2>
            Já ouviu seus cantores preferidos?
          </h2>

          <p>
            Bem-vindo ao seu novo destino musical! Nosso player de músicas oferece uma experiência
            personalizada para você curtir suas músicas favoritas em qualquer lugar, a qualquer
            hora. Escolha o plano que melhor combina com você e desbloqueie um mundo de possibilidades
            sonoras.
          </p>

          <Button>
            <span>
              Conhecer
            </span>
          </Button>
        </Session>

          <ImageModel 
            src="/img/views/hero/Music-cuate.png"
            alt="Escutes suas musica preferidas na GoLedger Music - Aqui você ouvi tudo e todos."
          />
      </LimitationWidth>
    </Container>
  )
}

export default Hero
