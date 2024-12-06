import styled from "styled-components"

export const Card = styled.div`
  width: 100%;
  height: 300px;
  background: #ebebeb82;
  padding: 10px;
  border: none;
  border-radius: 15px;
  transition: 0.8s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #ebebeb;
  }

  @media (min-width: 501px) {
    width: 200px;
    height: 250px;
    margin: 10px;
  }
`

export const ContentImage = styled.div`
  width: 100%;
  height: 200px;

  @media (min-width: 501px)  {
    height: 150px;
  }
`

export const ImageArtirt = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 20px;
`
export const Data = styled.article`
  padding: 10px;
  text-align: center;

  h4 {
    font-size: 18px;
    color:#000;

    @media (max-width: 500px) {
      font-size: 22px;
    }
  }

  span {
    font-size: 14px;
    color: #000;
  }
`

