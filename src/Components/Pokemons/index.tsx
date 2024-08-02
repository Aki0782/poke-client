import React, { useEffect } from "react";
// Importing React and the useEffect hook for component lifecycle management.

import { useZustand } from "Zustand/store";
// Importing the custom Zustand store hook for state management.

import { Cards } from "Components/Card";
// Importing the Cards component to display individual Pokémon cards.

type Props = {
  data: NationalPokemon | undefined;
};
// Defining the type for the component's props, which expects an optional `data` object of type `NationalPokemon`.

const Pokemon: React.FC<Props> = ({ data }) => {
  const { setSelectedItem, selectedItem } = useZustand();
  // Accessing `setSelectedItem` and `selectedItem` from the Zustand store.

  useEffect(() => {
    if (selectedItem.name === "" && data) {
      // If no Pokémon is selected and `data` is available, set the first Pokémon as the selected item.

      const url = `${data.image_url}${data.data[0].entry_number}${data.image_extension}`;
      // Construct the image URL using the base URL, entry number, and image extension.

      const { name } = data.data[0].pokemon_species;
      // Extract the name of the first Pokémon in the list.

      const number = data.data[0].entry_number;
      // Extract the entry number of the first Pokémon.

      setSelectedItem({
        name,
        url,
        number
      });
      // Set the selected item in the Zustand store.
    }
  }, [data, selectedItem.name, setSelectedItem]);
  // The effect runs whenever `data` or `selectedItem.name` changes.

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
      {/* A responsive grid layout for displaying Pokémon cards. */}

      {data &&
        data.data?.map((pokemon) => {
          // Iterating over the Pokémon data to render each card.

          const url = `${data.image_url}${pokemon.entry_number}${data.image_extension}`;
          // Constructing the image URL for each Pokémon.

          const { name } = pokemon.pokemon_species;
          // Extracting the name of the Pokémon.

          const number = pokemon.entry_number;
          // Extracting the entry number of the Pokémon.

          return (
            <Cards
              key={pokemon.entry_number}
              url={url}
              name={name}
              number={number}
              onClick={() => setSelectedItem({ name, url, number })}
            />
            // Rendering a card for each Pokémon, passing its details as props.
            // When a card is clicked, it sets the selected Pokémon in the Zustand store.
          );
        })}
    </div>
  );
};

export const Pokemons = React.memo(Pokemon);
// Exporting the Pokemon component wrapped in React.memo to optimize performance by memoizing the component.
