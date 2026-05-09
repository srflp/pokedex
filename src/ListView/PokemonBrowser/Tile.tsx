import type { SyntheticEvent } from "react";
import { capitalize } from "../../common/helpers";
import { useNavigate } from "@tanstack/react-router";
import { gridImage, label, shadow, tile } from "./Tile.css";

interface TileProps {
  imgSrc: string;
  name: string;
  pokemonId: number;
}

const setDefaultImage = (e: SyntheticEvent) => {
  (e.target as HTMLImageElement).src =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png";
};

export function Tile({ imgSrc, name, pokemonId }: TileProps) {
  const navigate = useNavigate();
  const showPokemon = () => {
    navigate({
      to: "/pokemon/$pokemonName",
      params: { pokemonName: name },
    });
  };

  return (
    <div className={tile}>
      <div className={label}>{capitalize(name)}</div>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <img
        className={gridImage({ pixelated: pokemonId < 722 })}
        src={imgSrc}
        alt={capitalize(name) + " - a pokemon"}
        onError={setDefaultImage}
        id={name}
        onClick={() => showPokemon()}
      />
      <div className={shadow} />
    </div>
  );
}
