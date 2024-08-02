interface NationalPokemon {
  total: number;
  totalPages: number;
  page: number;
  pageSize: number;
  data: Datum[];
  image_url: string;
  image_extension: string;
}

type Datum = {
  entry_number: number;
  pokemon_species: PokemonSpecies;
};

type PokemonSpecies = {
  name: string;
  url: string;
};
