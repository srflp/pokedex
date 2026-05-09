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

- **2026-05-09** — Fixed the `bundle-size` workflow's `strip-hash` regex to allow `-` in Vite's base64url content hashes (`-([\w-]{8})\.`). Files whose hash contained a hyphen (e.g. `preload-helper-CVO-9dvZ.js`) bypassed hash-stripping and showed up as a removed-plus-new pair instead of a stable diff.
- **2026-05-09** — Replaced raw `string` typing of pokemon types with a `PokemonType` literal union (the 18 known PokeAPI types). `pokemonTypeColors` is now a `Record<PokemonType, string>` so color lookups are type-safe by construction; introduced `DEFAULT_TYPE_COLOR` for UI fallbacks. Narrowed `PokemonDetail.types`, `fetchPokemonTypes`, and the URL `types` search-param at the API/route boundaries via an `isPokemonType` type guard.
- **2026-05-09** — Tightened `tsconfig.json`: enabled `noUncheckedIndexedAccess`, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, `noImplicitOverride`, and `noImplicitReturns` on top of `strict`. Removed redundant flags (`allowSyntheticDefaultImports`, `allowJs`, `forceConsistentCasingInFileNames` — implied by other settings or the TS 5 default). Fixed five sites surfaced by `noUncheckedIndexedAccess` with explicit fallbacks for unknown pokemon types and missing stat emojis.
- **2026-05-09** — Added a `lint` PR check running `oxlint` as a third parallel job in `checks.yml` (alongside `format` and `typecheck`). Configured via `.oxlintrc.json` with React/TS/JSX-a11y/unicorn/import plugins; `correctness` and `suspicious` categories as errors, `style` off (Prettier owns that), no type-aware rules (`tsgo` already covers those). Enabled `typescript/consistent-type-imports` (autofixable) and `typescript/consistent-type-exports` to enforce the `import type` / `export type` syntax for type-only specifiers, and turned on `verbatimModuleSyntax` in `tsconfig.json` so `tsgo` enforces the same contract (also banning `import x = require()` / `export =`).
- **2026-05-09** — Added a `typecheck` PR check running `tsgo --noEmit` (alongside `format` in a single `checks.yml` workflow with parallel jobs), and dropped the type-check step from the `build` script so Netlify's deploy preview only runs `vite build`.
- **2026-05-09** — Added a `bundle-size` GitHub Actions workflow using `preactjs/compressed-size-action` that posts a per-file gzip-size diff comment on every PR against `main` (informational, not required).
- **2026-05-09** — Modernized the toolchain end-to-end: migrated from Create React App to Vite; replaced Redux Toolkit + Redux Saga with TanStack Query and React Router with file-based TanStack Router (filter/search/page state moved to typed URL params); type-checking moved to TypeScript Native Preview (`tsgo`). Bumped React and `react-dom` to v19 with the React Compiler enabled, `styled-components` to v6, and Prettier to v3. Pinned Node 24, switched to pnpm, and added Playwright e2e + Prettier `format:check` GitHub Actions running on every PR. Enabled Renovate with auto-merge on green CI (covering npm, GitHub Actions, and the Playwright container image in `e2e.yml` — bumped in lockstep with `@playwright/test`), and added a `main` branch ruleset requiring `chromium`, `prettier --check`, and `netlify/alledex/deploy-preview` to pass before merge.
- **2023-01-31** — Migrated to pnpm and bumped all dependencies.
- **2020-06-19** — Migrated state management to Redux and Redux Saga.
- **2020-04-16** — Initial release.
