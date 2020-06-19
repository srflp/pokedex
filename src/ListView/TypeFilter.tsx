import React from "react";
import { capitalize } from "../common/helpers";
import styled from "styled-components/macro";
import pokemonTypeColors from "../common/pokemonTypeColors";
import { FlexCentered, BrightSection } from "../components/BaseComponents";
import Loader from "../components/Loader";
import { useTypedSelector } from "../configureStore";
import { selectedTypesActions } from "../store/filter/selectedTypesSlice";
import { useDispatch } from "react-redux";
import { typesWithPokemonNamesActions } from "../store/pokemon/typesWithPokemonNames";
import { page } from "../store/page/pageSlice";

const FilterTitle = styled.h2`
  font-weight: 500;
  color: #594a4e;
  font-size: 1rem;
  padding: 0.5rem 0;
  overflow: hidden;
  text-align: center;

  &:before,
  &:after {
    background-color: #c9c9c9;
    content: "";
    display: inline-block;
    height: 1px;
    position: relative;
    vertical-align: middle;
    width: 50%;
  }
  &:before {
    right: 0.5rem;
    margin-left: -50%;
  }

  &:after {
    left: 0.5rem;
    margin-right: -50%;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  flex-flow: row wrap;
`;

const Button = styled.button<{ selected: boolean }>`
  font-size: 1rem;
  font-weight: ${(props) => (props.selected ? 500 : "normal")};
  color: ${(props) => (props.selected ? "white" : "#594a4e")};
  background-color: ${(props) => (props.selected ? props.color : "white")};
  border-radius: 0.5rem;
  border: ${(props) => "1px solid " + props.color};
  flex-grow: ${(props) => (props.selected ? "3" : "1")};
  flex-basis: 0;
  padding: 0.5rem 0.75rem;
  margin: 0.25rem 0.25rem;
  outline: none;
  transition: all 0.05s ease-in-out;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  &:hover {
    transform: scale(1.05);
  }

  &:active {
    color: white;
    background-color: ${(props) => props.color};
  }
`;

const TypeFilter: React.FC = () => {
  const dispatch = useDispatch();
  const pokemonTypes = useTypedSelector((state) => state.pokemon.types);
  const pokemonTypesWithNames = useTypedSelector(
    (state) => state.pokemon.typesWithPokemonNames
  );
  const selectedPokemonTypes = useTypedSelector(
    (state) => state.filter.selectedTypes
  );

  return (
    <BrightSection>
      {pokemonTypes.length > 0 ? (
        <>
          <FilterTitle>filter by type</FilterTitle>
          <ButtonContainer>
            <Button
              onClick={() => {
                dispatch(selectedTypesActions.clear());
                dispatch(page.setCurrent(1));
              }}
              selected={selectedPokemonTypes.length === 0}
              color={pokemonTypeColors["none"]}
            >
              All
            </Button>
            {pokemonTypes.map((type) => (
              <Button
                key={type}
                value={type}
                onClick={() => {
                  if (!pokemonTypesWithNames.hasOwnProperty(type)) {
                    dispatch(typesWithPokemonNamesActions.fetchRequested(type));
                  }
                  dispatch(selectedTypesActions.toggle(type));
                  dispatch(page.setCurrent(1));
                }}
                selected={selectedPokemonTypes.includes(type)}
                color={pokemonTypeColors[type]}
              >
                {capitalize(type)}
              </Button>
            ))}
          </ButtonContainer>
        </>
      ) : (
        <>
          <FilterTitle>loading type filter</FilterTitle>
          <FlexCentered>
            <Loader style={{ height: "4rem" }} />
          </FlexCentered>
        </>
      )}
    </BrightSection>
  );
};

export default TypeFilter;
