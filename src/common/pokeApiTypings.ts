export namespace PokeAPI {
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
}
