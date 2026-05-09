import React from "react";
import { BrightSection } from "../../components/BaseComponents";
import PageNav from "./PageNav/PageNav";
import PokemonGrid from "./PokemonGrid";
import { PokemonListItem } from "../../api/pokemon";

interface Props {
  filteredPokemons: PokemonListItem[];
  totalPages: number;
  perPage: number;
}

const PokemonBrowser: React.FC<Props> = ({
  filteredPokemons,
  totalPages,
  perPage,
}) => {
  const pokemonBrowserRef = React.useRef<HTMLElement>(null);

  return (
    <BrightSection
      as="main"
      ref={pokemonBrowserRef}
      style={{ padding: "0.5rem" }}
    >
      <PageNav
        pokemonBrowserRef={pokemonBrowserRef}
        totalPages={totalPages}
        isTop={true}
      />
      <PokemonGrid
        filteredPokemons={filteredPokemons}
        perPage={perPage}
      />
      <PageNav
        pokemonBrowserRef={pokemonBrowserRef}
        totalPages={totalPages}
      />
    </BrightSection>
  );
};

export default PokemonBrowser;
