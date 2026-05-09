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

- **2026-05-09** — Replaced Redux Toolkit + Redux Saga with TanStack Query for server state, and React Router with TanStack Router. Filter, search and page state moved from Redux into typed URL search params, so list views are now shareable and reload-safe. TypeScript bumped to 5.9.
- **2026-05-09** — Migrated the build tool from Create React App (`react-scripts`) to Vite. Dev server and production build are now powered by Vite; `styled-components/macro` imports were replaced with plain `styled-components` (display names preserved via `babel-plugin-styled-components` in `vite.config.ts`).
- **2026-05-09** — Pinned Node.js to v24, switched tooling to pnpm, and added a Playwright end-to-end smoke suite running on each PR against the Netlify deploy preview and weekly against production.
- **2023-01-31** — Migrated to pnpm and bumped all dependencies.
- **2020-06-19** — Migrated state management to Redux and Redux Saga.
- **2020-04-16** — Initial release.
