import styled from "styled-components"

export const Container = styled.div`
  width: 100%;
  max-width: 250px;
  margin: 0 auto;

  button {
    padding: 10px;
    border: none;
    border-radius: 10px;
    background-color: #ffa600;
  }
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
    background-color: #c7c7c7;
  }

  select {
    padding: 10px 5px;
    border-radius: 5px;
  }
`

export const Actions = styled.div`
  button {
    padding: 10px 5px;
    border: none;
    margin-top: 15px;
    background-color: #ffa600;
    border-radius: 8px;
  }
`
