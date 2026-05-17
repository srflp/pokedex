import { useQuery } from "@tanstack/react-query";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { capitalize } from "../common/helpers";
import { DEFAULT_TYPE_COLOR, pokemonTypeColors } from "../common/pokemonTypeColors";
import { type PokemonType } from "../common/pokemonTypes";
import { FlexCentered, BrightSection } from "../components/BaseComponents";
import { Loader } from "../components/Loader";
import { fetchPokemonTypes } from "../api/pokemon";
import { Route } from "../routes";
import { buttonContainer, filterButton, filterColorVar, filterTitle } from "./TypeFilter.css";

export const TypeFilter = () => {
  const navigate = Route.useNavigate();
  const { types: selectedTypes } = Route.useSearch();

  const { data: pokemonTypes = [] } = useQuery({
    queryKey: ["pokemon-types"],
    queryFn: fetchPokemonTypes,
  });

  const setTypes = (next: PokemonType[]) =>
    navigate({
      search: (prev) => ({ ...prev, types: next, page: 1 }),
    });

  const toggleType = (type: PokemonType) => {
    setTypes(
      selectedTypes.includes(type)
        ? selectedTypes.filter((t) => t !== type)
        : [...selectedTypes, type],
    );
  };

  return (
    <BrightSection>
      {pokemonTypes.length > 0 ? (
        <>
          <h2 className={filterTitle}>filter by type</h2>
          <div className={buttonContainer}>
            <button
              className={filterButton({ selected: selectedTypes.length === 0 })}
              style={assignInlineVars({ [filterColorVar]: DEFAULT_TYPE_COLOR })}
              onClick={() => setTypes([])}
            >
              All
            </button>
            {pokemonTypes.map((type) => (
              <button
                key={type}
                value={type}
                className={filterButton({
                  selected: selectedTypes.includes(type),
                })}
                style={assignInlineVars({
                  [filterColorVar]: pokemonTypeColors[type],
                })}
                onClick={() => toggleType(type)}
              >
                {capitalize(type)}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2 className={filterTitle}>loading type filter</h2>
          <FlexCentered>
            <Loader style={{ height: "4rem" }} />
          </FlexCentered>
        </>
      )}
    </BrightSection>
  );
};
