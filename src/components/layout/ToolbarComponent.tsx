import { 
  Container,
  Logo
} from "../../styles/components/layout/ToolbarComponent"

const ToolbarComponent = () => {
  return(
    <Container>
      <Logo
        src="/favicon.png" 
        alt="Logo Goledger - APIs e Soluções em Blockchain" 
      />
    </Container>
  )
}

export default ToolbarComponent