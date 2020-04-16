import React, { useEffect, useState } from "react";
import Tile from "./Tile";
import { Grid } from "../../components/BaseComponents";
import usePages from "../usePages";
import usePokemonTypes from "../usePokemonTypes";
import useDebounce from "../../hooks/useDebounce";
import useSearch from "../useSearch";

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
  const { pages, dispatchPages } = usePages();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const { pokemonTypes, getSelectedPokemonTypes } = usePokemonTypes();
  const debouncedCurrentPage = useDebounce(pages.current, 200);
  const { search } = useSearch();

  useEffect(() => {
    dispatchPages({ type: "first" });
  }, [pokemonTypes, dispatchPages]);

  useEffect(() => {
    console.log("try to fetch pokemons");
    const selectedPokemonTypes = getSelectedPokemonTypes();
    if (selectedPokemonTypes.length === 0) {
      const fetchAllPokemons = async () => {
        console.log("fetch ALL pokemons");
        const url = `https://pokeapi.co/api/v2/pokemon-species/?limit=1000`;
        const res = await fetch(url);
        const { count, results } = await res.json();
        setPokemons(parsePokemons(results));
        dispatchPages({
          type: "set_total",
          payload: Math.ceil(count / pokemonsPerPage),
        });
      };
      fetchAllPokemons();
    } else {
      console.log("fetch SOME pokemons");
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
          console.log(`fetch '${pokemonType}' pokemons`);
          await fetchPokemonsOfType(pokemonType);
        }
        fetchedPokemons = fetchedPokemons
          .filter((p) => p.id < 1000)
          .sort((p1, p2) => p1.id - p2.id);
        setPokemons(fetchedPokemons);
        dispatchPages({
          type: "set_total",
          payload: Math.ceil(fetchedPokemons.length / pokemonsPerPage),
        });
      };
      fetchAllPokemonsOfType();
    }
  }, [dispatchPages, pokemonTypes, getSelectedPokemonTypes]);

  useEffect(() => {
    const newFilteredPokemons = pokemons.filter((pokemon) =>
      pokemon.name.includes(search.term)
    );
    setFilteredPokemons(newFilteredPokemons);
    dispatchPages({ type: "first" });
    dispatchPages({
      type: "set_total",
      payload: Math.ceil(newFilteredPokemons.length / pokemonsPerPage),
    });
  }, [search.term, pokemons, dispatchPages]);

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
