import { createFileRoute } from "@tanstack/react-router";
import { PokemonView } from "../PokemonView/PokemonView";

export const Route = createFileRoute("/pokemon/$pokemonName")({
  component: PokemonView,
});
