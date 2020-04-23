import React, { useEffect, useState } from "react";
import Tile from "./Tile";
import { Grid } from "../../components/BaseComponents";
import usePokemonTypes from "../usePokemonTypes";
import useDebounce from "../../hooks/useDebounce";
import useSearch from "../useSearch";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { page, PageAction } from "../../store/page/pageSlice";
import { useTypedSelector } from "../../configureStore";

interface Pokemon {
  id: number;
  url: string;
  imgUrl: string;
  name: string;
}

interface RawPokemon {
  name: string;
  url: string;
}

const parsePokemon = ({ name, url }: RawPokemon): Pokemon => {
  const id = parseInt(url.split("/").slice(-2)[0]);
  return {
    id,
    url,
    imgUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    name,
  };
};

const parsePokemons = (rawPokemons: RawPokemon[]): Pokemon[] => {
  return rawPokemons.map(({ name, url }) => {
    return parsePokemon({ name, url });
  });
};

const pokemonsPerPage = 60;

const PokemonGrid: React.FC = () => {
  const dispatch = useDispatch<Dispatch<PageAction>>();
  const currentPage = useTypedSelector((state) => state.page.current);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const { pokemonTypes, getSelectedPokemonTypes } = usePokemonTypes();
  const debouncedCurrentPage = useDebounce(currentPage, 200);
  const { search } = useSearch();

  useEffect(() => {
    dispatch(page.first());
  }, [dispatch, pokemonTypes]);

  useEffect(() => {
    const selectedPokemonTypes = getSelectedPokemonTypes();
    if (selectedPokemonTypes.length === 0) {
      const fetchAllPokemons = async () => {
        const url = `https://pokeapi.co/api/v2/pokemon/?limit=807`;
        const res = await fetch(url);
        const { results } = await res.json();
        setPokemons(parsePokemons(results));
        dispatch(page.setTotal(Math.ceil(results.length / pokemonsPerPage)));
      };
      fetchAllPokemons();
    } else {
      let fetchedPokemons: Pokemon[] = [];
      const fetchedPokemonNamesSet = new Set();
      const fetchAllPokemonsOfType = async () => {
        const fetchPokemonsOfType = async (pokemonType: string) => {
          const url = `https://pokeapi.co/api/v2/type/${pokemonType}/`;
          const res = await fetch(url);
          const { pokemon } = await res.json();
          pokemon.forEach((pokemonEl: { pokemon: RawPokemon }) => {
            const pokemonName = pokemonEl.pokemon.name;
            if (!fetchedPokemonNamesSet.has(pokemonName)) {
              fetchedPokemonNamesSet.add(pokemonName);
              fetchedPokemons.push(parsePokemon(pokemonEl.pokemon));
            }
          });
        };
        for (const pokemonType of selectedPokemonTypes) {
          await fetchPokemonsOfType(pokemonType);
        }
        fetchedPokemons = fetchedPokemons
          .filter((p) => p.id < 1000)
          .sort((p1, p2) => p1.id - p2.id);
        setPokemons(fetchedPokemons);
        dispatch(
          page.setTotal(Math.ceil(fetchedPokemons.length / pokemonsPerPage))
        );
      };
      fetchAllPokemonsOfType();
    }
  }, [dispatch, pokemonTypes, getSelectedPokemonTypes]);

  useEffect(() => {
    const newFilteredPokemons = pokemons
      .filter((pokemon) => pokemon.name.includes(search.term))
      // sort lexicographically
      .sort((a, b) => (a.name < b.name ? -1 : 1))
      // sort by the index of found substring in the word
      .sort(
        (a, b) => a.name.indexOf(search.term) - b.name.indexOf(search.term)
      );
    setFilteredPokemons(newFilteredPokemons);
    dispatch(page.first());
    dispatch(
      page.setTotal(Math.ceil(newFilteredPokemons.length / pokemonsPerPage))
    );
  }, [dispatch, search.term, pokemons]);

  return (
    <Grid>
      {(search.term === "" ? pokemons : filteredPokemons)
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
