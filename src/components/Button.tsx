import styled from "styled-components";

const Button = styled.a`
  font-family: "VT323", monospace;
  color: #33272a;
  background-color: rgb(235, 235, 235);
  padding: 0.75rem 0.75rem;
  font-size: 1.25rem;
  border-radius: 0.5rem;
  text-decoration: none;
  cursor: pointer;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
  &:hover {
    background-color: rgb(225, 225, 225);
  }
  &:active {
    background-color: rgb(215, 215, 215);
  }
  &:first-child {
    margin-right: 0.25rem;
  }
`;

export default Button;
