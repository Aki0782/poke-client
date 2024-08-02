import dotenv from "dotenv";
// Importing the dotenv package to load environment variables from a .env file.

dotenv.config();
// Loading environment variables from the .env file into process.env.

import { RequestOptions } from "./types/requestTypes";
// Importing a custom type that defines the structure of request options.

const BaseUrl = process.env.POKE_BASE_URL;
// Fetching the base URL for the Pokémon API from environment variables.

export default {
  // Exporting an object with two functions: getAllPokemon and getPokemonDetails.

  getAllPokemon: ({
    page,
    limit
  }: {
    page: number;
    limit: number;
  }): RequestOptions => {
    // Function to generate a request options object for fetching a list of Pokémon.
    // Takes page and limit as parameters to control pagination.

    return {
      url: `${BaseUrl}/pokemon?page=${page}&pageSize=${limit}`
      // Constructs the URL using the base URL, page, and limit.
    };
  },

  getPokemonDetails: (name: string): RequestOptions => {
    // Function to generate a request options object for fetching details of a specific Pokémon.
    // Takes the Pokémon's name as a parameter.

    return {
      url: `${BaseUrl}/search/${name}`
      // Constructs the URL using the base URL and the Pokémon's name.
    };
  }
};
