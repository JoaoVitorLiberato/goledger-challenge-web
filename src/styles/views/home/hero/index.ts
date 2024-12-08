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

// style para children do dialog
export const ContainerDialogPlaylist = styled.div``

export const ContentCardPlaylistCache = styled.div`
  text-align: center;

  h3 {
    margin: 40px 0 0;
    text-transform: uppercase;
    font-size: 14px;
  }

  
  @media (min-width: 501px) {
    text-align: start;
  }
`

export const CardPlaylistCache = styled.div`
  margin: 10px 5px 20px;
  padding: 10px;
  width: 100%;
  max-width: 170px;
  border: 1px solid #c3c3c3;
  border-radius: 7px;
  text-align: center;

  @media (max-width: 500px) {
    margin: 10px auto 20px;
  }

  h5 {
    margin-bottom: 15px;
    font-size: 12px;
    text-transform: uppercase;
  }

  button {
    background-color: #ffd4d4;
    padding: 8px 5px;
    border: none;
    outline: none;
    border-radius: 10px;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 11px;
    cursor: pointer;
    transition: .8s ease all;

    &:hover {
      background-color: #eb9b9b;
    }
  }
`
