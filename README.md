# Pokédex

[![Netlify Status](https://api.netlify.com/api/v1/badges/81b36aa8-9ffb-4018-a185-c02d2c232861/deploy-status)](https://app.netlify.com/projects/alledex/deploys)

Pokédex is a web application written in TypeScript using the React library. It is a list of Pokémon with the ability to filter by type, search by name, and view details about each Pokémon.

This project was created as a recruitment task for a summer internship at Allegro (2020).

[Go to the Pokédex!](https://alledex.netlify.app/)

^ The latest version of the application is always running here.

## Installation

If you want to run this project locally on your computer, navigate to your projects directory and clone this repo:

`git clone https://github.com/srflp/pokedex.git`

A `pokedex` directory will be created with the project. Go into it and install the required modules:

`pnpm install`

After installing the modules, the app can be started with `pnpm dev`.
It should start on port 3000.

## Changelog

- **2026-05-17** — Replaced Prettier with [oxfmt](https://oxc.rs/docs/guide/usage/formatter.html) (the Oxc formatter, same family as oxlint): swapped the `format` / `format:check` scripts and renamed the CI job. Migrated ignore patterns from `.prettierignore` to `ignorePatterns` in a new `.oxfmtrc.json`. Adopted oxfmt's default `printWidth: 100` (up from Prettier's 80), which reflowed lines across the codebase.
- **2026-05-16** — Hardened the dependency update flow against supply-chain attacks: set `minimumReleaseAge: 4320` (3 days) in `pnpm-workspace.yaml` so pnpm refuses to install package versions less than 72 hours old, and relocated Renovate config to `.github/renovate.json` while switching to `config:best-practices` (which enforces a complementary minimum release age at the PR-opening stage).
- **2026-05-09** — Modernized the toolchain end-to-end: migrated from Create React App to Vite, replaced Redux Toolkit + Redux Saga with TanStack Query and file-based TanStack Router (typed URL params), bumped React to v19 with the React Compiler enabled and Prettier to v3, pinned Node 24, switched to pnpm, and added Playwright e2e + Renovate auto-merge with a `main` branch ruleset. Added `format` / `typecheck` (`tsgo --noEmit`) / `lint` (`oxlint` with React/TS/a11y/unicorn/import plugins) parallel PR checks plus an informational `bundle-size` workflow, and tightened `tsconfig.json` (`noUncheckedIndexedAccess`, `verbatimModuleSyntax`, and friends) alongside a `PokemonType` literal union replacing raw `string` typing for the 18 PokeAPI types. Dropped `React.FC` for the automatic JSX runtime, banned manual memoization (`memo` / `useMemo` / `useCallback`) via `no-restricted-imports` since the React Compiler owns that, and replaced `styled-components` with **vanilla-extract** for zero-runtime type-safe styles (~11 kB gzip JS shaved against ~2 kB new CSS).
- **2023-01-31** — Migrated to pnpm and bumped all dependencies.
- **2020-06-19** — Migrated state management to Redux and Redux Saga.
- **2020-04-16** — Initial release.
