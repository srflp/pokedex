import React from "react";
import { Tile } from "./Tile";
import { Grid } from "../../components/BaseComponents";
import { PokemonListItem } from "../../api/pokemon";
import { Route } from "../../routes";

interface Props {
  filteredPokemons: PokemonListItem[];
  perPage: number;
}

export const PokemonGrid: React.FC<Props> = ({ filteredPokemons, perPage }) => {
  const { page } = Route.useSearch();

  return (
    <Grid>
      {filteredPokemons
        .slice(perPage * (page - 1), perPage * page)
        .map(({ imgUrl, name, id }) => (
          <Tile key={name} imgSrc={imgUrl} name={name} pokemonId={id} />
        ))}
    </Grid>
  );
};
