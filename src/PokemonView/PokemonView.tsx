import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { Route } from "../routes/pokemon.$pokemonName";
import { fetchPokemonDetail } from "../api/pokemon";
import { capitalize } from "../common/helpers";
import { BrightSection, Flex } from "../components/BaseComponents";
import { Button } from "../components/Button";
import { Loader } from "../components/Loader";
import {
  DEFAULT_TYPE_COLOR,
  pokemonTypeColors,
} from "../common/pokemonTypeColors";
import { Stat } from "./Stat";
import {
  backRow,
  heightText,
  mainColumn,
  pageTitle,
  spriteImage,
  statsContainer,
  typeBadge,
  typeColorVar,
} from "./PokemonView.css";

export const PokemonView = () => {
  const { pokemonName } = Route.useParams();
  const router = useRouter();

  const { data: pokemon } = useQuery({
    queryKey: ["pokemon-detail", pokemonName],
    queryFn: () => fetchPokemonDetail(pokemonName),
    enabled: Boolean(pokemonName),
  });

  useEffect(() => {
    if (pokemonName) {
      document.title = capitalize(pokemonName) + " - Pokédex";
    }
  }, [pokemonName]);

  return (
    <BrightSection>
      <Flex className={backRow}>
        <Button onClick={() => router.history.back()}>&lt; back</Button>
      </Flex>
      <Flex className={mainColumn}>
        {!pokemon ? (
          <Loader style={{ maxHeight: "4rem" }} />
        ) : (
          <>
            <h1 className={pageTitle}>{capitalize(pokemon.name)}</h1>
            <img
              className={spriteImage}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
              alt={pokemonName}
            />
            <Flex>
              {pokemon.types.map((type) => (
                <div
                  key={type}
                  className={typeBadge}
                  style={assignInlineVars({
                    [typeColorVar]: pokemonTypeColors[type],
                  })}
                >
                  {capitalize(type)}
                </div>
              ))}
            </Flex>
            <div className={statsContainer}>
              {pokemon.stats.map((stat) => (
                <Stat
                  key={stat.id}
                  max={pokemon.maxStatValue}
                  color={
                    pokemon.types[0]
                      ? pokemonTypeColors[pokemon.types[0]]
                      : DEFAULT_TYPE_COLOR
                  }
                  {...stat}
                />
              ))}
            </div>
            <div>
              <p className={heightText}>
                Height:{" "}
                <span aria-hidden="true">↕️</span>{" "}
                {pokemon.height}
              </p>
            </div>
          </>
        )}
      </Flex>
    </BrightSection>
  );
};
