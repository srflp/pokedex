# Pokédex

Pokédex to aplikacja webowa napisana w TypeScripcie w frameworku React. Jest to lista Pokemonów z możliwością filtrowania po typie, wyszukiwania po nazwie oraz obejrzenia detali o każdym z Pokemonów.

Ten projekt powstał jako zadanie rekrutacyjne na staż letni w Allegro.

[Przejdź do Pokédexa!](https://alledex.netlify.app/) 

^ W tym miejscu uruchomiona jest zawsze najświeższa wersja aplikacji.

## Instalacja
Jeśli chcesz uruchomić ten projekt lokalnie na swoim komputerze, przejdź do katalogu z projektami, a nastepnie sklonuj to repo:

`git clone https://github.com/srflp/pokedex.git`

Utworzony zostanie katalog `pokedex` z projektem, przejdź do niego i zainstaluj wymagane moduły:

`yarn install` lub `npm install`

Po instalacji modułów, aplikację można uruchomić za pomocą `yarn start` lub `npm start`.
Powinna uruchomić się na porcie 3000.

## TODO
Czyli to co planuję dodać w najbliższym czasie:

- przejście ze stanem na Reduxa lub inną alternatywę (tu także do zapytań asynchronicznych do API przydałby się Redux Thunk/Saga), bo trudno jest zachować dobrą wydajność korzystając z samego hooka useContext i przekazywania propsów
- 100% stanu aplikacji ma być trzymane w URLu (strona i wybrane filtry), po przejściu na Reduxa powinno być to łatwiejsze
- wybór ilości Pokemonów wyświetlanych na stronie w zależności od ilości wyświetlanych kolumn/szerokości ekranu
- filtrowanie po kolorach, wyświetlanie ewolucji pokemonów, zmiana dostawcy zdjęć z PokeAPI na lepszego