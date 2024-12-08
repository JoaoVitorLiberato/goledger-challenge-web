import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
`;

export const CarouselContainer = styled.div`
  width: 100%;
  max-width: 300px;
  margin: 20px auto;
  overflow: hidden;
  position: relative;
  border: 2px solid #ccc;
  border-radius: 10px;
`;

export const CarouselTrack = styled.div<{ translate: number }>`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${(props) => props.translate}%);
`;

export const Slide = styled.div<{ bgcolor?: string }>`
  min-width: 100%;
  height: 150px;
  background-color: ${(props) => props.bgcolor || "transparent"};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  color: white;
`;

export const Button = styled.button<{ bgcolor?: string }>`
  width: 55px;
  height: 55px;
  border-radius: 14px;
  background-color: ${(props) => (props.bgcolor || "#f0f0f0")};
  border: none;
  outline: none;
  margin-top: 10px;

  img {
    width: 30px;
    height: 30px;
  }
`;

export const PrevButton = styled(Button)`
  transform: rotate(-180deg);
  margin-right: 15px;
`

export const NextButton = styled(Button)``

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
    color: #000;
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