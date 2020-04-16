import React from "react";
import styled from "styled-components/macro";

const FooterLink = styled.a`
  text-decoration: none;
  color: rgb(130, 130, 130);
  &:hover {
    color: rgb(90, 90, 90);
    text-decoration: underline;
  }
`;

const rawFooter: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <footer className={className}>
      <p style={{ paddingBottom: "0.2rem" }}>
        © 2020{" "}
        <FooterLink href="https://github.com/srflp">Filip Sauer</FooterLink>
      </p>
      <p>
        Created using{" "}
        <FooterLink href="https://pokeapi.co/">PokéApi</FooterLink> and{" "}
        <FooterLink href="https://reactjs.org/">React</FooterLink>
      </p>
    </footer>
  );
};

const Footer = styled(rawFooter)`
  justify-content: center;
  text-align: center;
  font-size: 0.9rem;
  margin: 1.5rem 1rem 1rem;
  color: rgb(160, 160, 160);
`;

export default Footer;
