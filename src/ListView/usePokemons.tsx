export {};

// import React from "react";
// import useFetch from "../hooks/useFetch";
// import { PokeAPI } from "../pokeApiTypings";
//
// interface Pokemon {
//   id: number;
//   url: string;
//   imgUrl: string;
//   name: string;
// }
//
// const parsePokemon = ({ name, url }: PokeAPI.NamedAPIResource): Pokemon => {
//   const id = parseInt(url.split("/").slice(-2)[0]);
//   return {
//     id,
//     url,
//     imgUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
//     name,
//   };
// };
//
// const parsePokemons = (rawPokemons: PokeAPI.NamedAPIResource[]): Pokemon[] => {
//   return rawPokemons.map(({ name, url }) => {
//     return parsePokemon({ name, url });
//   });
// };
//
// export type PokemonsAction =
//   | { type: "load_state"; payload: Pokemon[] }
//   | { type: "filter" }
//   | { type: "disable_all" };
//
// type PokemonTypesContext = {
//   pokemons: Pokemon[];
//   dispatchPokemon: React.Dispatch<PokemonsAction>;
// };
//
// const pokemonsReducer = (
//   pokemons: Pokemon[],
//   action: PokemonsAction
// ): Pokemon[] => {
//   switch (action.type) {
//     case "toggle":
//       return pokemonTypes.map(([pokemonType, state]) => [
//         pokemonType,
//         action.payload === pokemonType ? !state : state,
//       ]);
//     case "filter":
//       return pokemonTypes.map(([pokemonType]) => [pokemonType, false]);
//     case "load_state":
//       return action.payload;
//     default:
//       throw new Error("Error in pokemonTypesReducer: invalid action type");
//   }
// };
//
// const PokemonsContext = React.createContext({} as PokemonsContext);
//
// export const PokemonTypesProvider: React.FC = ({ children }) => {
//   const [pokemons, dispatchPokemons] = React.useReducer(pokemonsReducer, []);
//
//   const contextValue = React.useMemo(() => {
//     return { pokemons, dispatchPokemons };
//   }, [pokemons, dispatchPokemons]);
//
//   return (
//     <PokemonsContext.Provider value={contextValue}>
//       {children}
//     </PokemonsContext.Provider>
//   );
// };
//
// const usePokemonTypes = () => {
//   const {
//     pokemonTypes,
//     dispatchPokemonTypes,
//     getSelectedPokemonTypes,
//   } = usePokemonTypes();
//   const [fetchResponse, fetchReady] = useFetch<
//     PokeAPI.APIResourceList<PokeAPI.NamedAPIResource>
//   >("https://pokeapi.co/api/v2/type");
//   const { pokemonTypes, dispatchPokemonTypes } = React.useContext(
//     PokemonTypesContext
//   );
//
//   React.useEffect(() => {
//     if (fetchReady) {
//       const readyPokemonTypes = fetchResponse.results.reduce(
//         (pokemonTypes: PokemonType[], el: { name: string }) => {
//           if (el.name !== "unknown" && el.name !== "shadow")
//             pokemonTypes.push([el.name, false]);
//           return pokemonTypes;
//         },
//         []
//       );
//
//       dispatchPokemonTypes({
//         type: "load_state",
//         payload: readyPokemonTypes,
//       });
//     }
//   }, [fetchReady, fetchResponse, dispatchPokemonTypes]);
//
//   const getSelectedPokemonTypes = React.useCallback((): string[] => {
//     return pokemonTypes.reduce(
//       (selectedTypes: string[], [type, isSelected]) => {
//         if (isSelected) selectedTypes.push(type);
//         return selectedTypes;
//       },
//       []
//     );
//   }, [pokemonTypes]);
//
//   return { pokemonTypes, dispatchPokemonTypes, getSelectedPokemonTypes };
// };
//
// export default usePokemonTypes;
