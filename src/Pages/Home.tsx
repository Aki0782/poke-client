// Importing React and the useRef hook for creating a reference to a DOM element.
import { useRef } from "react";
import InfiniteScroll from "react-infinite-scroller";
// Importing the InfiniteScroll component for implementing infinite scrolling functionality.

// Importing the PokemonCard, Header, and Pokemons components from the Components module.
import { PokemonCard, Header, Pokemons } from "Components";
import { useGetAllPokemon } from "Hooks";
// Importing the custom hook to fetch Pokémon data with infinite scrolling support.

export const Home = () => {
  const { data, hasNextPage, fetchNextPage } = useGetAllPokemon();
  // Using the custom hook to fetch Pokémon data. `data` contains the fetched pages,
  // `hasNextPage` indicates if there are more pages to load, and `fetchNextPage` is a function to load the next page.

  const scrollableRef = useRef(null);
  // Creating a ref to attach to the scrollable container, allowing control over its scrolling behavior.

  return (
    <div className="flex p-8 flex-col h-screen overflow-hidden">
      {/* Main container with flex layout, padding, and full screen height */}

      <Header />
      {/* Rendering the Header component */}

      <div className="flex h-full">
        {/* Flex container that holds the scrollable Pokémon list and the Pokémon details card */}

        <div
          ref={scrollableRef}
          className="overflow-auto "
        >
          {/* Scrollable container for the list of Pokémon */}

          {data && (
            <InfiniteScroll
              pageStart={0}
              loadMore={() => fetchNextPage()}
              hasMore={hasNextPage}
              loader={<h4 key={0}>Loading...</h4>}
              useWindow={false}
              getScrollParent={() => scrollableRef.current}
            >
              {/* Implementing infinite scroll within the scrollable container */}

              {data.pages.map((page, pageIndex) => (
                <Pokemons
                  key={`${pageIndex}-${pageIndex}`}
                  data={page}
                />
                // Rendering the Pokemons component for each page of Pokémon data
              ))}
            </InfiniteScroll>
          )}
        </div>

        <div className="flex-1 flex justify-center">
          <PokemonCard />
          {/* Rendering the PokemonCard component to display details of the selected Pokémon */}
        </div>
      </div>
    </div>
  );
};
