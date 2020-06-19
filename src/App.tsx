import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import { Container } from "./components/BaseComponents";
import Header from "./components/Header";
import ListView from "./ListView/ListView";
import PokemonView from "./PokemonView/PokemonView";
import Footer from "./components/Footer";
import { PokemonTypesProvider } from "./ListView/usePokemonTypes";

const App: React.FC = () => {
  return (
    <Container>
      <Header />
      <BrowserRouter>
        <QueryParamProvider ReactRouterRoute={Route}>
          <Switch>
            <Route path={"/"} exact>
              <PokemonTypesProvider>
                <ListView />
              </PokemonTypesProvider>
            </Route>
            <Route path={"/pokemon/:pokemonName"}>
              <PokemonView />
            </Route>
          </Switch>
        </QueryParamProvider>
      </BrowserRouter>
      <Footer />
    </Container>
  );
};

export default App;
