import styled from "styled-components"

export const Container = styled.div`
  margin-top: 15px;
  max-width: 150px;
  height: 180px;
  background-image: url("https://th.bing.com/th/id/OIP.rm4o2LZV2iOu83ECOsG-pwHaEm?rs=1&pid=ImgDetMain");
  background-position: center 25px;
  background-size: contain;
  background-repeat: no-repeat;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  background-color: #fbfbfb;
  text-align: center;
  border: 1px solid;
  border-radius: 5px;
`

export const Card = styled.div<{ bg: string }>`
  background-color: ${(props) => props.bg || "#e95f5f" };
  line-height: 10px;
  padding: 5px;
  
  span {
    font-size: 11px;
  }
`

export const Title = styled.h5`
  text-transform: uppercase;
  font-size: 10px;
  color: #000;
`

export const Actions = styled.div`
  button {
    margin: 5px 0 0;
    padding: 2px;
    background-color: #eb9b9b;
    border: none;
    border-radius: 5px;
    transition: .8s ease;

    &:hover {
      background-color: #ddc3c3;
    }
  }
`