import { put, all, takeLatest, takeEvery } from "redux-saga/effects";
import { listActions } from "./pokemon/listSlice";
import { typesActions } from "./pokemon/typesSlice";
import { typesWithPokemonNamesActions } from "./pokemon/typesWithPokemonNames";
import { PayloadAction } from "@reduxjs/toolkit";
import { PokeAPI } from "../common/pokeApiTypings";

function* fetchPokemon() {
  const url = `https://pokeapi.co/api/v2/pokemon/?limit=807`;
  const results = yield fetch(url)
    .then((res) => res.json())
    .then((parsedRes) => parsedRes.results);
  yield put(listActions.fetchReceived(results));
}

function* fetchPokemonTypes() {
  const url = `https://pokeapi.co/api/v2/type`;
  const results = yield fetch(url)
    .then((res) => res.json())
    .then((parsedRes) => parsedRes.results);
  yield put(typesActions.fetchReceived(results));
}

function* fetchTypesWithPokemonNames(action: PayloadAction<string>) {
  const url = `https://pokeapi.co/api/v2/type/${action.payload}`;
  const results = yield fetch(url)
    .then((res) => res.json())
    .then((parsedRes: PokeAPI.Type) => parsedRes.pokemon);

  yield put(
    typesWithPokemonNamesActions.fetchReceived({
      type: action.payload,
      pokemons: results,
    })
  );
}

export default function* rootSaga() {
  yield all([
    takeLatest(listActions.fetchRequested.toString(), fetchPokemon),
    takeLatest(typesActions.fetchRequested.toString(), fetchPokemonTypes),
    takeEvery(
      typesWithPokemonNamesActions.fetchRequested.toString(),
      fetchTypesWithPokemonNames
    ),
  ]);
}
