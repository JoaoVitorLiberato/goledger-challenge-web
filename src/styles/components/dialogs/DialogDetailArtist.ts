import styled from "styled-components"

export const Container = styled.div``

export const ContentSongs = styled.div`
  margin-bottom: 40px;

  header {
    display: flex;
    align-items: center;

    span {
      font-size: 18px;
      font-weight: 400;
      display: block;
    }

    button {
      width: 30px;
      height: 30px;
      padding: 0;
      border: none;
      outline: none;
      border-radius: 50%;
      cursor: pointer;

      span {
        display: none;
        font-size: 16px;
      }

      @media (max-width: 500px) {
        border-radius: 10px;
        width: 100%;
        padding: 5px;
        margin: 10px 0;
        background-color: #00e7ff;

        img {
          display: none;
        }

        span {
          display: block;
        }
      }
    }

    @media (max-width: 500px) {
      text-align: center;
      display: flex;
      flex-direction: column;
    }
  }

  ul {
    list-style: none;
    padding: 5px;
    margin-top: 15px ;
    max-height: 300px;
    overflow-y: scroll;

    li {
      padding: 2px;
      margin: 10px 0;

      span {
        font-size: 12px;
      }

      span:nth-child(2) {
        margin-left: 5px;
      }

      div {
        button {
          margin: 5px 0;
          padding: 5px;
          border: none;
          border-radius: 15px;

          &:nth-child(1) {
            background-color: #ffa600;
          }
          &:nth-child(2) {
            background-color: #ff6666;
          }
        }
      }
    }
  }

`

export const ContentAlbums = styled.div``