import { createFileRoute, stripSearchParams } from "@tanstack/react-router";
import { ListView } from "../ListView/ListView";

export interface ListSearch {
  q: string;
  types: string[];
  page: number;
}

const listSearchDefaults: ListSearch = { q: "", types: [], page: 1 };

export const Route = createFileRoute("/")({
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
