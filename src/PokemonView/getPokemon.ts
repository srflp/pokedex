import { PokeAPI } from "../common/pokeApiTypings";
import { capitalize } from "../common/helpers";

export type InitialPokemon = NotReadyPokemon | Pokemon;
export interface NotReadyPokemon {
  ready: false;
}

interface PokemonStat {
  id: string;
  emoji: string;
  name: string;
  value: number;
}

export interface Pokemon {
  ready: true;
  id: number;
  name: string;
  types: string[];
  stats: PokemonStat[];
  maxStatValue: number;
  height: string;
}

const fetchPokemon = async (pokemonName: string): Promise<PokeAPI.Pokemon> => {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  const res = await fetch(url);
  return await res.json();
};

const statNameToEmoji: { [key: string]: string } = {
  speed: "  💨",
  "special-defense": "✨🛡️",
  "special-attack": "✨🗡️",
  defense: "  🛡️",
  attack: "  🗡️",
  hp: "  ❤️",
};

const parsePokemon = (pokemon: PokeAPI.Pokemon): Pokemon => {
  return {
    ready: true,
    id: pokemon.id,
    name: pokemon.name,
    types: pokemon.types
      .sort((a, b) => a.slot - b.slot)
      .map((typeObj) => typeObj.type.name),
    stats: pokemon.stats.map((statObj) => ({
      id: statObj.stat.name,
      emoji: statNameToEmoji[statObj.stat.name],
      name: statObj.stat.name
        .split("-")
        .map((name) => (name === "hp" ? "HP" : capitalize(name)))
        .join(" "),
      value: statObj.base_stat,
    })),
    maxStatValue: pokemon.stats.reduce(
      (max, statObj) => (statObj.base_stat > max ? statObj.base_stat : max),
      0
    ),
    height: (pokemon.height / 10).toString() + " m",
  };
};

export const getPokemon = async (pokemonName: string) => {
  return parsePokemon(await fetchPokemon(pokemonName));
};
