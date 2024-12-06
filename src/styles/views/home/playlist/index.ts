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
  justify-content: space-between;

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

  ul {
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
  }

  ul li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #00e7ff21;
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
      width: 43px;
      height: 35px;
      border: none;
      outline: none;
      cursor: pointer;
      margin: 0 2px;

      img {
        width: 100%;
        height: 100%;
      }

      &:nth-child(3) {
        width: 35px;
        height: 26px;
      }
    }

    .active-player {
      background-color: #00e7ff21;
    }

    .desative-player {
      background-color: transparent;
    }
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
    max-width: 300px;
    height: 150px;
    text-align: center;
    margin: 0 auto 30px;

    img {
      width: 100%;
      height: 100%;
    }

    span {
      color: #fff;
    }
  }

  .detail_content {
    margin-top:30px;
    text-align: center;

    span {
      display: block;
    }
  }
`
