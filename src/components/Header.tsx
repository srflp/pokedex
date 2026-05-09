import styled from "styled-components";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
`;

const HeaderText = styled.h1`
  font-family: "Baloo Paaji 2", sans-serif;
  color: #33272a;
  padding-left: 1rem;
  font-size: 3rem;
`;

export function Header() {
  return (
    <HeaderContainer>
      <HeaderText>Pokédex</HeaderText>
    </HeaderContainer>
  );
}
