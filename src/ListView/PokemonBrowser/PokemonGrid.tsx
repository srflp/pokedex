import React, { useEffect } from "react";
import Tile from "./Tile";
import { Grid } from "../../components/BaseComponents";
import useDebounce from "../../hooks/useDebounce";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../configureStore";
import { listActions } from "../../store/pokemon/listSlice";
import { typesActions } from "../../store/pokemon/typesSlice";
import pokemonSelector from "../../store/pokemon/pokemonSelector";

const PokemonGrid: React.FC = () => {
  const dispatch = useDispatch();
  const pokemonsPerPage = useTypedSelector((state) => state.page.perPage);
  const currentPage = useTypedSelector((state) => state.page.current);
  const pokemons = useTypedSelector(pokemonSelector);
  const debouncedCurrentPage = useDebounce(currentPage, 200);

  useEffect(() => {
    !pokemons.length && dispatch(listActions.fetchRequested());
    dispatch(typesActions.fetchRequested());
    /* eslint-disable-next-line */ // this is called only once
  }, []);

  return (
    <Grid>
      {pokemons
        .slice(
          pokemonsPerPage * (debouncedCurrentPage - 1),
          pokemonsPerPage * debouncedCurrentPage
        )
        .map(({ imgUrl, name, id }) => (
          <Tile key={name} imgSrc={imgUrl} name={name} pokemonId={id} />
        ))}
    </Grid>
  );
};

export default PokemonGrid;
