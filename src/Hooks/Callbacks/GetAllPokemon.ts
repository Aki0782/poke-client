// Importing the `useInfiniteQuery` hook from React Query for handling infinite scrolling of data.
import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
// Importing the AxiosResponse type for typing the API response.

import Api from "Api";
// Importing the custom API handler for making HTTP requests.

import Pokemon from "Api/Pokemon";
// Importing the Pokémon API utility for constructing request options.

const getAllPokemon = async ({
  pageParam = 1,
  limit
}: {
  pageParam: number;
  limit: number;
}) => {
  // Function to fetch a paginated list of Pokémon.
  // `pageParam` defaults to 1 and controls the current page.
  // `limit` controls the number of Pokémon to fetch per page.

  const request = Pokemon.getAllPokemon({ page: pageParam, limit });
  // Constructing the request options using the `getAllPokemon` function from the Pokémon API utility.

  const response: AxiosResponse<NationalPokemon> =
    await Api.performRequest(request);
  // Making the API request using the custom API handler and typing the response.

  return response.data;
  // Returning the response data containing the Pokémon list.
};

export const useGetAllPokemon = (limit = 20) =>
  useInfiniteQuery({
    // Custom hook that uses React Query's `useInfiniteQuery` to fetch paginated Pokémon data.
    queryKey: ["pokemon"],
    // The query key is used for caching and deduplication of queries.

    queryFn: ({ pageParam = 1 }) => getAllPokemon({ pageParam, limit }),
    // The function to fetch the Pokémon data, passing the current page and limit.

    getNextPageParam: (lastPage) => {
      // Function to determine the next page to fetch.
      const nextPage = lastPage.page + 1;
      // Incrementing the current page by 1.

      return nextPage <= lastPage.totalPages ? nextPage : undefined;
      // If the next page is within the total number of pages, return it.
      // Otherwise, return undefined to indicate there are no more pages.
    },

    initialPageParam: 1
    // The initial page parameter, starting at page 1.
  });
