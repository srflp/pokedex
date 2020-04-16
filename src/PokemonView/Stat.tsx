import React from "react";
import Progress from "../components/Progress";
import { PokemonStat } from "./getPokemon";

interface Props extends PokemonStat {
  max: number;
  color: string;
}

const Stat: React.FC<Props> = ({ id, emoji, name, value, max, color }) => {
  return (
    <>
      <p
        style={{
          marginBottom: "0.3rem",
        }}
      >
        {name}
        <span style={{ display: "block", float: "right" }}>
          {value} <span role={"img"}>{emoji}</span>
        </span>
      </p>
      <Progress
        value={value}
        max={max}
        color={color}
        background={"#faeee7"}
        style={{ marginBottom: "1rem" }}
      />
    </>
  );
};

export default Stat;
