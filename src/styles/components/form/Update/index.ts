import styled from "styled-components";

export const Container = styled.div`
  background-color: #c3c3c3;
  padding: 10px;
  border-radius: 6px;
`

export const Form = styled.form``

export const ContentForm = styled.div`
  padding: 8px 0;

  label {
    text-transform: uppercase;
    font-size: 13px;
  }

  input[type=text], input[type=tel] {
    padding: 10px 5px;
    border-radius: 5px;
    border: none;
    background-color: #fff;
  }

  select {
    padding: 10px 5px;
    border-radius: 5px;
  }
`

export const Actions = styled.div`
  button {
    padding: 10px;
    margin-top: 15px;
    border-radius: 10px;
    border:none;
  }
`