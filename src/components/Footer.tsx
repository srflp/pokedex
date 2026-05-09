import { footer, footerLink } from "./Footer.css";

export const Footer = () => (
  <footer className={footer}>
    <p style={{ paddingBottom: "0.2rem" }}>
      © 2020{" "}
      <a className={footerLink} href="https://github.com/srflp">
        Filip Sauer
      </a>
    </p>
    <p>
      Created using{" "}
      <a className={footerLink} href="https://pokeapi.co/">
        PokéApi
      </a>{" "}
      and{" "}
      <a className={footerLink} href="https://reactjs.org/">
        React
      </a>
    </p>
  </footer>
);
