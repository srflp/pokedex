import React from "react";
import useFetch from "../hooks/useFetch";
import { PokeAPI } from "../common/pokeApiTypings";

export type PokemonType = [string, boolean];
export type PokemonTypesAction =
  | { type: "load_state"; payload: PokemonType[] }
  | { type: "toggle"; payload: string }
  | { type: "disable_all" };

type PokemonTypesContext = {
  pokemonTypes: PokemonType[];
  dispatchPokemonTypes: React.Dispatch<PokemonTypesAction>;
};

const pokemonTypesReducer = (
  pokemonTypes: PokemonType[],
  action: PokemonTypesAction
): PokemonType[] => {
  switch (action.type) {
    case "toggle":
      return pokemonTypes.map(([pokemonType, state]) => [
        pokemonType,
        action.payload === pokemonType ? !state : state,
      ]);
    case "disable_all":
      return pokemonTypes.map(([pokemonType]) => [pokemonType, false]);
    case "load_state":
      return action.payload;
    default:
      throw new Error("Error in pokemonTypesReducer: invalid action type");
  }
};

const PokemonTypesContext = React.createContext({} as PokemonTypesContext);

export const PokemonTypesProvider: React.FC = ({ children }) => {
  const [pokemonTypes, dispatchPokemonTypes] = React.useReducer(
    pokemonTypesReducer,
    []
  );

  const contextValue = React.useMemo(() => {
    return { pokemonTypes, dispatchPokemonTypes };
  }, [pokemonTypes, dispatchPokemonTypes]);

  return (
    <PokemonTypesContext.Provider value={contextValue}>
      {children}
    </PokemonTypesContext.Provider>
  );
};

const usePokemonTypes = () => {
  const [fetchResponse, fetchReady] = useFetch<
    PokeAPI.APIResourceList<PokeAPI.NamedAPIResource>
  >("https://pokeapi.co/api/v2/type");
  const { pokemonTypes, dispatchPokemonTypes } = React.useContext(
    PokemonTypesContext
  );

  React.useEffect(() => {
    if (fetchReady) {
      const readyPokemonTypes = fetchResponse.results.reduce(
        (pokemonTypes: PokemonType[], el: { name: string }) => {
          if (el.name !== "unknown" && el.name !== "shadow")
            pokemonTypes.push([el.name, false]);
          return pokemonTypes;
        },
        []
      );

      dispatchPokemonTypes({
        type: "load_state",
        payload: readyPokemonTypes,
      });
    }
  }, [fetchReady, fetchResponse, dispatchPokemonTypes]);

  const getSelectedPokemonTypes = React.useCallback((): string[] => {
    return pokemonTypes.reduce(
      (selectedTypes: string[], [type, isSelected]) => {
        if (isSelected) selectedTypes.push(type);
        return selectedTypes;
      },
      []
    );
  }, [pokemonTypes]);

  return { pokemonTypes, dispatchPokemonTypes, getSelectedPokemonTypes };
};

export default usePokemonTypes;
