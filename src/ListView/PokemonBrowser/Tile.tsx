import type { SyntheticEvent } from "react";
import { Link } from "@tanstack/react-router";
import { capitalize } from "../../common/helpers";
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
  return (
    <Link to="/pokemon/$pokemonName" params={{ pokemonName: name }} className={tile}>
      <div className={label}>{capitalize(name)}</div>
      <img
        className={gridImage({ pixelated: pokemonId < 722 })}
        src={imgSrc}
        alt={capitalize(name) + " - a pokemon"}
        onError={setDefaultImage}
        id={name}
      />
      <div className={shadow} />
    </Link>
  );
}
