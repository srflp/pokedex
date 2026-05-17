import type { PokeAPI } from "../common/pokeApiTypings";
import { isPokemonType, type PokemonType } from "../common/pokemonTypes";

export interface PokemonListItem {
  id: number;
  name: string;
  url: string;
  imgUrl: string;
}

const parsePokemon = ({ name, url }: PokeAPI.NamedAPIResource): PokemonListItem => {
  const id = parseInt(url.split("/").slice(-2)[0] ?? "0");
  return {
    id,
    name,
    url,
    imgUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
  };
};

export const fetchPokemonList = async (): Promise<PokemonListItem[]> => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=807");
  const json = await res.json();
  return (json.results as PokeAPI.NamedAPIResource[]).map(parsePokemon);
};

export const fetchPokemonTypes = async (): Promise<PokemonType[]> => {
  const res = await fetch("https://pokeapi.co/api/v2/type");
  const json = await res.json();
  return (json.results as PokeAPI.NamedAPIResource[]).map((t) => t.name).filter(isPokemonType);
};

export const fetchPokemonNamesByType = async (type: PokemonType): Promise<string[]> => {
  const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
  const json = (await res.json()) as PokeAPI.Type;
  return json.pokemon.map((p) => p.pokemon.name);
};

export interface PokemonStat {
  id: string;
  emoji: string;
  name: string;
  value: number;
}

export interface PokemonDetail {
  id: number;
  name: string;
  types: PokemonType[];
  stats: PokemonStat[];
  maxStatValue: number;
  height: string;
}

const statNameToEmoji: { [key: string]: string } = {
  speed: "  💨",
  "special-defense": "✨🛡️",
  "special-attack": "✨🗡️",
  defense: "  🛡️",
  attack: "  🗡️",
  hp: "  ❤️",
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const parsePokemonDetail = (pokemon: PokeAPI.Pokemon): PokemonDetail => ({
  id: pokemon.id,
  name: pokemon.name,
  types: pokemon.types
    .toSorted((a, b) => a.slot - b.slot)
    .map((typeObj) => typeObj.type.name)
    .filter(isPokemonType),
  stats: pokemon.stats.map((statObj) => ({
    id: statObj.stat.name,
    emoji: statNameToEmoji[statObj.stat.name] ?? "",
    name: statObj.stat.name
      .split("-")
      .map((name) => (name === "hp" ? "HP" : capitalize(name)))
      .join(" "),
    value: statObj.base_stat,
  })),
  maxStatValue: pokemon.stats.reduce(
    (max, statObj) => (statObj.base_stat > max ? statObj.base_stat : max),
    0,
  ),
  height: (pokemon.height / 10).toString() + " m",
});

export const fetchPokemonDetail = async (pokemonName: string): Promise<PokemonDetail> => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  const json = (await res.json()) as PokeAPI.Pokemon;
  return parsePokemonDetail(json);
};
