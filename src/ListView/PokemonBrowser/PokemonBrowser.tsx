import React from "react";
import { BrightSection } from "../../components/BaseComponents";
import PageNav from "./PageNav/PageNav";
import PokemonGrid from "./PokemonGrid";

const PokemonBrowser: React.FC = () => {
  const pokemonBrowserRef = React.useRef<HTMLElement>(null);

  return (
    <BrightSection
      as="main"
      ref={pokemonBrowserRef}
      style={{ padding: "0.5rem" }}
    >
      <PageNav pokemonBrowserRef={pokemonBrowserRef} isTop={true} />
      <PokemonGrid />
      <PageNav pokemonBrowserRef={pokemonBrowserRef} />
    </BrightSection>
  );
};

export default PokemonBrowser;
