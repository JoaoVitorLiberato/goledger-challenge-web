import styled from "styled-components"

export const Container = styled.header`
  width: 100%;
  padding: 20px 10px;

  @media (max-width: 500px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export const Logo = styled.img`
  width: 156px;
  height: 38px;
`