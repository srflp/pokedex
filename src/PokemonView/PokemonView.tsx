import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Img from "react-image";
import { InitialPokemon, getPokemon } from "./getPokemon";
import { capitalize } from "../common/helpers";
import { BrightSection, Flex } from "../components/BaseComponents";
import Button from "../components/Button";
import Loader, { LoaderSmall } from "../components/Loader";
import styled from "styled-components";
import pokemonTypeColors from "../common/pokemonTypeColors";
import Stat from "./Stat";

const TypeBadge = styled.div<{ type: string }>`
  font-size: 0.9rem;
  font-weight: 500;
  color: white;
  border-radius: 5px;
  background-color: ${(props) => pokemonTypeColors[props.type]};
  padding: 0.5rem;
  margin-right: 0.25rem;
  &:last-child {
    margin-right: 0;
  }
`;

const PokemonView: React.FC = () => {
  const { pokemonName } = useParams();
  const [pokemon, setPokemon] = useState<InitialPokemon>({
    ready: false,
  });
  const history = useHistory();

  useEffect(() => {
    if (pokemonName) {
      document.title = capitalize(pokemonName) + " - Pokédex";
    }
  }, [pokemonName]);

  useEffect(() => {
    if (pokemonName) {
      (async () => {
        const pokemon = await getPokemon(pokemonName);
        setPokemon(pokemon);
      })();
    }
  }, [pokemonName]);

  return (
    <BrightSection>
      <Flex style={{ margin: "0.25rem" }}>
        <Button onClick={history.goBack}>&lt; back</Button>
      </Flex>
      <Flex style={{ flexDirection: "column", alignItems: "center" }}>
        {!pokemon.ready ? (
          <Loader style={{ maxHeight: "4rem" }} />
        ) : (
          <>
            <h1
              style={{
                fontSize: "2rem",
                margin: "0.5rem",
                fontFamily: '"VT323", monospace',
              }}
            >
              {capitalize(pokemon.name)}
            </h1>
            <Img
              style={{ margin: "0.5rem" }}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
              loader={<LoaderSmall style={{ maxHeight: "4rem" }} />}
            />
            <Flex>
              {pokemon.types.map((type) => (
                <TypeBadge key={type} type={type}>
                  {capitalize(type)}
                </TypeBadge>
              ))}
            </Flex>
            <div
              style={{
                width: "100%",
                maxWidth: "400px",
                padding: "0.7rem",
                boxSizing: "border-box",
              }}
            >
              {pokemon.stats.map((stat) => (
                <Stat
                  key={stat.id}
                  max={pokemon.maxStatValue}
                  color={pokemonTypeColors[pokemon.types[0]]}
                  {...stat}
                />
              ))}
            </div>
            <div>
              <p style={{ marginBottom: "1.2rem" }}>
                Height:{" "}
                <span role="img" aria-label={"Height"}>
                  ↕️
                </span>{" "}
                {pokemon.height}
              </p>
            </div>
          </>
        )}
      </Flex>
    </BrightSection>
  );
};

export default PokemonView;
