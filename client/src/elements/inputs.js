import styled from 'styled-components';

export const Input = styled.input.attrs((props) => ({
  type: props.type || 'text',
}))`
  outline: none;
  border: 0;
  border-bottom: 2px solid #c5c5c5;
  display: block;
  width: 100%;
  padding: 10px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  margin-bottom: 1em;
`;

export const TextArea = styled.textarea`
  outline: none;
  border: 0;
  border-bottom: 2px solid #c5c5c5;
  display: block;
  width: 100%;
  padding: 10px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  margin-bottom: 1em;
`;

export const Button = styled.button`
  background-color: #ffe0b2;
  text-align: center;
  padding: 1em;
  display: block;
  width: ${(props) => props.size || '100%'};
  margin: 2em auto 0;
  outline: none;
  border: 0;
  border-radius: 10px;
  font-weight: 700;
  transition: all 0.1s ease-in;

  &:hover {
    background-color: #e65100;
    color: #fff;
    transition: all 0.1s ease-in;
  }
`;

export const UpdateButton = styled.span`
  a {
    background-color: #1a237e;
    text-align: center;
    width: auto;
    padding: 0.5em 2em;
    outline: none;
    border: 0;
    border-radius: 10px;
    font-weight: 700;
    transition: all 0.1s ease-in;
    color: #fff;
    text-decoration: none;
    margin: 0 0.5em;

    &:hover {
      background-color: #0d47a1;
      transition: all 0.1s ease-in;
    }
  }
`;

export const DeleteButton = styled.span`
  a {
    background-color: #b71c1c;
    text-align: center;
    width: auto;
    padding: 0.5em 2em;
    outline: none;
    border: 0;
    border-radius: 10px;
    font-weight: 700;
    transition: all 0.1s ease-in;
    color: #fff;
    text-decoration: none;
    margin: 0 0.5em;

    &:hover {
      background-color: #c62828;
      transition: all 0.1s ease-in;
    }
  }
`;

export const ViewButton = styled.span`
  a {
    background-color: #2e7d32;
    text-align: center;
    width: auto;
    padding: 0.5em 2em;
    outline: none;
    border: 0;
    border-radius: 10px;
    font-weight: 700;
    transition: all 0.1s ease-in;
    color: #fff;
    text-decoration: none;
    margin: 0 0.5em;

    &:hover {
      background-color: #388e3c;
      transition: all 0.1s ease-in;
    }
  }
`;
