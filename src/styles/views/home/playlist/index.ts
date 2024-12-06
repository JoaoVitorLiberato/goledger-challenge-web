import styled from "styled-components"

export const Container = styled.div`
  padding: 20px 10px;
  background-color: #4267B2;
  min-height: 300px;
`

export const LimitationWidth = styled.div`
  max-width: 980px;
  margin: 0 auto;

  display: flex;
  flex-direction: column-reverse;
  justify-content: space-around;

  .image_player_desatived {
    width: 100%;

    @media (min-width: 768px) {
      width: 320px;
      height: 320px;
    }
  }

  @media (min-width: 768px) {
    flex-direction: row;
  }
`

export const ContainterListSongs = styled.div`
  border: 1px solid #fff;
  max-width: 350px;
  max-height: 367px;
  margin-right: 20px;

  @media (max-width:500px) {
    margin-right: 0;
    margin: 20px auto;
  }
`

export const ListSong = styled.ul`
  list-style: none;
  max-height: 307px;
  overflow-y: scroll;
  padding: 0 5px;

  &::-webkit-scrollbar {
    width: 7px;

    @media (max-width: 500px) {
      width: 0px;
    }
  }

  &::-webkit-scrollbar-track {
    background: #fff;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #eb4444;
  }
`

export const Song = styled.li<{ bg: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.bg || "transparent"};
  margin: 5px 0;
  padding: 5px 10px;
  border: none;
  border-radius: 10px;

  span {
    font-weight: 400;
    color: #fff
  }

  button {
    background-color: transparent;
    width: 35px !important;
    height: 35px !important;
    border: none;
    outline: none;
    cursor: pointer;
    margin: 0 2px;
  }
`


export const ContainterDetailSong = styled.div`
  max-width: 350px;
  background-color: #00e7ff21;
  padding: 15px;
  border-radius: 15px;
  border: none;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 501px) {
    flex-direction: row-reverse;
    max-width: 500px;
  }

  .image_content {
    max-width: 150px;
    height: 110px;
    text-align: center;
    margin: 0 auto 30px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .detail_content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .detail_content-song {
        div {
          padding: 5px 0;
        }

        div strong {
          text-transform: uppercase;
          color: #000;
          font-size: 14px;
        }

        span {
          font-size: 16px;
          font-weight: 400;
          padding-left: 5px;
        }
    }

    .detail_content-action {
      margin-top: 10px;

      button {
        margin: 5px 0;
        padding: 10px;
        font-size: 16px;
        border-radius:8px;
        border: none;
        outline: none;
        color: #fff
      }

      .detail_content-action-stop {
        background-color: #f59625;
      }
      .detail_content-action-delete {
        background-color: #eb4444;
      }
    }
  }
`
