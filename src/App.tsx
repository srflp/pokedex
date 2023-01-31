import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "./components/BaseComponents";
import Header from "./components/Header";
import ListView from "./ListView/ListView";
import PokemonView from "./PokemonView/PokemonView";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <Container>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListView />} />
          <Route path="/pokemon/:pokemonName" element={<PokemonView />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </Container>
  );
};

export default App;
