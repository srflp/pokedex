import React from "react";
import { Progress } from "../components/Progress";
import { PokemonStat } from "../api/pokemon";

interface Props extends PokemonStat {
  max: number;
  color: string;
}

export const Stat: React.FC<Props> = ({ emoji, name, value, max, color }) => (
  <>
    <p style={{ marginBottom: "0.3rem" }}>
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
