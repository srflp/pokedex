import React from "react";
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  stripSearchParams,
} from "@tanstack/react-router";
import { Container } from "./components/BaseComponents";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ListView from "./ListView/ListView";
import PokemonView from "./PokemonView/PokemonView";

export interface ListSearch {
  q: string;
  types: string[];
  page: number;
}

const rootRoute = createRootRoute({
  component: () => (
    <Container>
      <Header />
      <Outlet />
      <Footer />
    </Container>
  ),
});

const listSearchDefaults: ListSearch = { q: "", types: [], page: 1 };

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: ListView,
  validateSearch: (search: Record<string, unknown>): ListSearch => {
    const rawTypes = search.types;
    const types = Array.isArray(rawTypes)
      ? rawTypes.filter((t): t is string => typeof t === "string")
      : [];
    const rawPage = search.page;
    const page =
      typeof rawPage === "number" && rawPage > 0 ? Math.floor(rawPage) : 1;
    const q = typeof search.q === "string" ? search.q : "";
    return { q, types, page };
  },
  search: {
    middlewares: [stripSearchParams(listSearchDefaults)],
  },
});

export const pokemonRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pokemon/$pokemonName",
  component: PokemonView,
});

const routeTree = rootRoute.addChildren([indexRoute, pokemonRoute]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
