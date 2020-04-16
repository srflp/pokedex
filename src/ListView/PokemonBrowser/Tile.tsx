import React, { useCallback } from "react";
import styled from "styled-components/macro";
import { capitalize } from "../../common/helpers";
import { useHistory } from "react-router-dom";
import Img from "react-image";
import loaderSmall from "../../common/loader-small.png";

const TileStyled = styled(Tile)`
  height: 100%;
  width: 100%;

  &:before {
    content: " ";
    display: block;
    width: 100%;
  }
`;

const TileContainer = styled.div`
  position: relative;
  margin: auto;
`;

const Shadow = React.memo(styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 40%;
  width: 60%;
  padding-top: 60%;
  background: #fffcfa;
`);

const GridImage = styled(({ pixelated, ...props }) => <Img {...props} />)<{
  pixelated: boolean;
}>`
  position: absolute;
  height: 100%;
  image-rendering: ${(props) => (props.pixelated ? "crisp-edges" : "smooth")};
  -ms-interpolation-mode: ${(props) =>
    props.pixelated ? "nearest-neighbor" : "smooth"};
  image-rendering: ${(props) =>
    props.pixelated ? "-webkit-optimize-contrast" : "smooth"};
  image-rendering: ${(props) =>
    props.pixelated ? "-moz-crisp-edges" : "smooth"};
  image-rendering: ${(props) => (props.pixelated ? "-o-pixelated" : "smooth")};
  image-rendering: ${(props) => (props.pixelated ? "pixelated" : "smooth")};
  z-index: 1;
  transition: all 90ms ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const Loader = styled.img`
  position: absolute;
  height: 100%;
  z-index: 1;
`;

const Label = styled.div`
  font-family: "VT323", monospace;
  font-size: 1.3em;
  white-space: nowrap;
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translate(-50%, -50%);
  z-index: 2;
  color: #33272a;
  background-color: rgba(255, 255, 254, 0.7); //rgba(255, 255, 255, 0.8);
  border-radius: 5px;
`;

interface TileProps {
  className?: string;
  imgSrc: string;
  name: string;
  pokemonId: number;
}

function Tile({ className, imgSrc, name, pokemonId }: TileProps) {
  const history = useHistory();
  const setDefaultImage = (e: React.SyntheticEvent) => {
    (e.target as HTMLImageElement).src =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png";
  };
  const showPokemon = useCallback(() => {
    const path = `pokemon/${name}`;
    history.push(path);
  }, [name, history]);

  return (
    <TileContainer className={className}>
      <Label>{capitalize(name)}</Label>
      <GridImage
        src={imgSrc}
        alt={capitalize(name) + " - a pokemon"}
        onError={setDefaultImage}
        id={name}
        onClick={() => showPokemon()}
        loader={<Loader src={loaderSmall} />}
        pixelated={pokemonId < 722}
      />
      <Shadow />
    </TileContainer>
  );
}

export default TileStyled;
