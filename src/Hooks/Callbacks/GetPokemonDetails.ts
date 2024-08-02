// Importing the `useQuery` hook from React Query for fetching data.
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
// Importing the AxiosResponse type for typing the API response.

import Api from "Api";
// Importing the custom API handler for making HTTP requests.

import Pokemon from "Api/Pokemon";
// Importing the Pokémon API utility for constructing request options.

const getDetails = async (name: string) => {
  // Function to fetch details of a specific Pokémon by its name.

  const request = Pokemon.getPokemonDetails(name);
  // Constructing the request options using the `getPokemonDetails` function from the Pokémon API utility.

  const response: AxiosResponse<PokeDetails> =
    await Api.performRequest(request);
  // Making the API request using the custom API handler and typing the response.

  const { data } = response;
  // Extracting the data from the response.

  return data;
  // Returning the Pokémon details data.
};

export const useGetDetails = (name: string) => {
  // Custom hook that uses React Query's `useQuery` to fetch Pokémon details.

  return useQuery({
    queryKey: ["pokemon", name],
    // The query key is used for caching and deduplication of queries.
    // It includes the Pokémon name to uniquely identify the query for this specific Pokémon.

    queryFn: () => getDetails(name)
    // The function to fetch the Pokémon details using the `getDetails` function.
  });
};
