import React from "react";
import Tile from "./Tile";
import { Grid } from "../../components/BaseComponents";
import { indexRoute } from "../../router";
import { PokemonListItem } from "../../api/pokemon";

interface Props {
  filteredPokemons: PokemonListItem[];
  perPage: number;
}

const PokemonGrid: React.FC<Props> = ({ filteredPokemons, perPage }) => {
  const { page } = indexRoute.useSearch();

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

export default PokemonGrid;
