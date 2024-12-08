import styled from "styled-components"

export const Card = styled.div`
  width: 100%;
  height: 370px;
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
    width: 250px;
    height: 310px;
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
export const Data = styled.div`
  padding: 5px 10px;
  text-align: center;
  height: 40px;

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

export const Actions = styled.div`
  button {
    cursor: pointer;
    padding: 10px 5px;
    border:none;
    outline: none;
    border-radius: 10px;
    transition: .8s ease;
    
    &:nth-child(1) {
      background-color: #30828b69;
      margin: 10px 0;

      &:hover {
        background-color: #00e7ff21;
      }
    }
    &:nth-child(2) {
      background-color: #eb9b9b;
      color: red;

      &:hover {
        background-color: #cf5f5f;
      }
    }
  }
`
