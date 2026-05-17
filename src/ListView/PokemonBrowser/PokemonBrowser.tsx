import { useRef } from "react";
import { BrightSection } from "../../components/BaseComponents";
import { PageNav } from "./PageNav/PageNav";
import { PokemonGrid } from "./PokemonGrid";
import type { PokemonListItem } from "../../api/pokemon";

interface Props {
  filteredPokemons: PokemonListItem[];
  totalPages: number;
  perPage: number;
}

export const PokemonBrowser = ({ filteredPokemons, totalPages, perPage }: Props) => {
  const pokemonBrowserRef = useRef<HTMLElement>(null);

  return (
    <BrightSection as="main" ref={pokemonBrowserRef} style={{ padding: "0.5rem" }}>
      <PageNav pokemonBrowserRef={pokemonBrowserRef} totalPages={totalPages} isTop={true} />
      <PokemonGrid filteredPokemons={filteredPokemons} perPage={perPage} />
      <PageNav pokemonBrowserRef={pokemonBrowserRef} totalPages={totalPages} />
    </BrightSection>
  );
};
