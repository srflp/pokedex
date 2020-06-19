export namespace PokeAPI {
  // Common models
  export interface APIResourceList<T extends NamedAPIResource | APIResource> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T extends NamedAPIResource ? NamedAPIResource[] : APIResource[];
  }

  export interface APIResource {
    url: string;
  }

  export interface NamedAPIResource extends APIResource {
    name: string;
  }

  export interface GenerationGameIndex {
    game_index: number;
    generation: NamedAPIResource;
  }

  export interface Name {
    name: string;
    language: NamedAPIResource;
  }

  // Pokemon endpoint
  export interface PokemonAbility {
    is_hidden: boolean;
    slot: number;
    ability: NamedAPIResource;
  }

  export interface VersionGameIndex {
    game_index: number;
    version: NamedAPIResource;
  }

  export interface PokemonHeldItemVersion {
    version: NamedAPIResource;
    rarity: number;
  }

  export interface PokemonHeldItem {
    item: NamedAPIResource;
    version_details: PokemonHeldItemVersion[];
  }

  export interface PokemonSprites {
    front_default: string;
    front_shiny: string;
    front_female: string;
    front_shiny_female: string;
    back_default: string;
    back_shiny: string;
    back_female: string;
    back_shiny_female: string;
  }

  export interface PokemonStat {
    stat: NamedAPIResource;
    effort: number;
    base_stat: number;
  }

  export interface PokemonType {
    slot: number;
    type: NamedAPIResource;
  }

  export interface Pokemon {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilities: PokemonAbility[];
    forms: NamedAPIResource[];
    game_indices: VersionGameIndex[];
    held_items: PokemonHeldItem[];
    location_area_encounters: string;
    moves: [];
    sprites: PokemonSprites;
    species: NamedAPIResource[];
    stats: PokemonStat[];
    types: PokemonType[];
  }

  // Type endpoint
  export interface TypeRelations {
    no_damage_to: NamedAPIResource[];
    half_damage_to: NamedAPIResource[];
    double_damage_to: NamedAPIResource[];
    no_damage_from: NamedAPIResource[];
    half_damage_from: NamedAPIResource[];
    double_damage_from: NamedAPIResource[];
  }

  export interface TypePokemon {
    slot: number;
    pokemon: NamedAPIResource;
  }

  export interface Type {
    id: number;
    name: string;
    damage_relations: TypeRelations;
    game_indices: GenerationGameIndex[];
    generation: NamedAPIResource[];
    move_damage_class: NamedAPIResource[];
    names: Name[];
    pokemon: TypePokemon[];
    moves: NamedAPIResource[];
  }
}
