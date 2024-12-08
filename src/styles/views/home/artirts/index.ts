import styled from "styled-components"

export const Container = styled.div`
  background-color: aliceblue;
  padding: 20px 10px;
  text-align: center;
`

export const LimitationWidth = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`

export const CardsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  max-height: 450px;
  margin-top: 40px;

  @media (max-width: 500px) {
    display: none;
    max-height: 100%;
  }

`
export const CardsContainerMobile = styled.div`
  @media (min-width: 501px) {
    display: none;
  }

`

export const Title = styled.h2`
  text-transform: uppercase;
  margin-top: 20px;
`