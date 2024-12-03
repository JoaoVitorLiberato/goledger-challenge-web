import styled from "styled-components"

export const Card = styled.div`
  width: 200px;
  height: 250px;
  background-color: #ebebeb82;
  margin: 10px;
  border: none;
  border-radius: 15px;
  transition: 0.8s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #ebebeb;
  }
`

export const ImageArtirt = styled.img`
  width: 100%;
  height: 170px;
  border-radius: 15px 15px 0 0;
`
export const Data = styled.article`
  padding: 10px;
  text-align: center;

  span {
    font-size: 14px;
    
  }
`

