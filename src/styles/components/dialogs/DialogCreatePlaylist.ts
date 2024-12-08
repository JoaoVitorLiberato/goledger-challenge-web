import styled from "styled-components";

export const ConatinerForm = styled.form `
  max-width: 400px;
  margin: 0 auto;

  div {
    margin: 5px 0;
  }

  div button {
    padding: 12px 8px;
    border: none;
    border-radius: 10px;
    background-color: yellow;
    font-weight: 600;
    font-size: 12px;
    text-transform: uppercase;
    cursor: pointer;
  }

  .error--text {
    color: red;
    font-size: 12px;
  }

  .fix-checkbox {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 30px;
    margin-bottom: 30px;

    input[type="checkbox"] {
      width: 30px;
    }

    label {
      font-size: 13px;
    }
  }
`;

export const ContentSongs = styled.div `
  min-height: 100px;
  max-height: 320px;
  padding: 10px;
  background-color: #fff6f6;
  border: none;
  border-radius: 10px;
  overflow-y: scroll;

  span {
    font-size: 13px;
  }

  ul {
    list-style: none;
    margin-top: 15px;
  }
`;

export const ContentSongsList = styled.li<{ bg?: string }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;
    padding: 8px;
    background-color: ${(props) => (props.bg || "transparent")};
    cursor: pointer;

    &:hover {
      background-color: #00e7ff21;
    }

    div {
      width: 25px;
      height: 25px;
    }

`