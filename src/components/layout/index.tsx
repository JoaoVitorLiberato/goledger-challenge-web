import React, { FC } from "react"
import { IChildren } from "../../types/containerElemets"
import ToolbarComponent from "./ToolbarComponent"
import FooterComponent from "./FooterComponent"
import { Container } from "../../styles/components/layout"

const LayoutApp: FC<IChildren> = ({ children }) => {
  return(
    <React.Fragment>
      <ToolbarComponent />
      <Container>
        { children }
      </Container>
      <FooterComponent />
    </React.Fragment>
  )
}

export default LayoutApp