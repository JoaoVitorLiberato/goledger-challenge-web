import styled from "styled-components"

export const Container = styled.div`
  width: 100%;
  padding: 20px 10px;
`
export const LimitationWidth = styled.div`
  max-width: 1100px;
  margin: 0 auto;

  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  text-align: center;

  @media (min-width: 768px) {
    flex-direction: row;
    text-align: start;
  }
`

export const Session = styled.article`
  h2 {
    text-transform: uppercase;
    font-weight: 800;
    font-size: 20px;
    margin-top: 15px;

    @media (min-width: 768px) {
      margin-top: 60px;
    }
  }

  p {
    margin: 25px 0;
  }
`
export const Button = styled.button`
  width: 100%;
  padding: 15px 10px;
  border-radius: 15px;
  border: none;
  outline: none;
  cursor: pointer;
  transition: 0.9s ease-out all;

  &:hover {
    background-color: #fff341;
  }

  span {
    font-size: 16px;
    font-weight: bold;
  }

  @media (min-width: 768px) {
    width: 280px;
  }
`

export const ImageModel = styled.img`
  width: 300px;
  height: 300px;

  @media (min-width: 501px) and (max-width: 879px) {
    width: 400px;
    height: 400px;
  }

  @media (min-width: 880px) {
    width: 500px;
    height: 500px;
  }
`
