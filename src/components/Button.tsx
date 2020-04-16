import styled from "styled-components/macro";

const Button = styled.button<{ hide?: boolean }>`
  font-family: "VT323", monospace;
  color: #33272a;
  background-color: rgb(235, 235, 235);
  padding: 0.75rem 0.75rem;
  font-size: 1.25rem;
  border-radius: 0.5rem;
  cursor: pointer;
  visibility: ${({ hide }) => (hide ? "hidden" : "visible")};
  border: none;
  outline: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

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
