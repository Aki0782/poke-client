import React from "react";
// Importing React to create the component.

// Importing a custom hook to fetch Pokémon details.
import { useGetDetails } from "Hooks";
import { useZustand } from "Zustand/store";
// Importing a custom Zustand store hook for state management.

export const PokemonCard = () => {
  const { selectedItem } = useZustand();
  // Accessing the selected item from the Zustand store.

  const { data } = useGetDetails(selectedItem.name);
  // Fetching the details of the selected Pokémon using the custom hook.
  // The selected Pokémon's name is passed as an argument.

  const type = data?.types?.map((type) => type.type.name).join(" - ");
  // Extracting the types of the Pokémon and joining them with a dash.

  console.log({ data });
  // Logging the fetched data for debugging purposes.

  return (
    <div className="max-w-xs max-h-[600px] bg-yellow-200 border-4 border-yellow-500 rounded-lg p-4 shadow-lg">
      {/* Main container with styling for max width and height, background color, border, and padding */}

      {/* Header */}
      <div className="flex flex-col">
        <div>
          <p className="text-sm font-bold capitalize">{type} Pokémon</p>
          {/* Displays the Pokémon type(s) in bold and capitalized text */}
        </div>
        <div className="text-right flex justify-between items-start">
          <h2 className="text-2xl font-bold capitalize">{selectedItem.name}</h2>
          {/* Displays the Pokémon name in bold and capitalized text */}
          <p className="text-red-600 text-xl font-bold">
            {data?.base_experience} HP
          </p>
          {/* Displays the Pokémon's base experience (used here as HP) in bold red text */}
        </div>
      </div>

      {/* Image */}
      <img
        width={100}
        src={selectedItem.url} // Replace with actual image path
        alt={selectedItem.name} // Using the Pokémon's name for the alt attribute
        className="w-full my-4"
      />
      {/* Displays the Pokémon's image. Ensure to replace src with the correct image path */}

      {/* Description */}
      <p className="font-bold capitalize mt-4">Stat:</p>
      <div className="bg-yellow-100 p-2 border-t-2 border-yellow-500 flex justify-between items-center">
        <p className="text-sm">Height: {data?.height}</p>
        {/* Displays the Pokémon's height */}
        <p className="text-sm">Weight: {data?.weight}</p>
        {/* Displays the Pokémon's weight */}
      </div>

      {/* Moves */}
      <p className="font-bold capitalize mt-4">Moves:</p>
      <div className="bg-white p-2 border-t-2 border-gray-300">
        <div className="mt-2">
          <div className="grid grid-cols-2 gap-2">
            {data?.moves?.slice(0, 4).map((move, i) => (
              <p
                key={i}
                className={`font-bold capitalize align-middle ${
                  i % 2 === 0 ? "text-left" : "text-right"
                }`}
              >
                {move.move.name}
              </p>
            ))}
            {/* Displays the first four moves of the Pokémon in a two-column grid.
                The text is left-aligned for even indexes and right-aligned for odd indexes. */}
          </div>
        </div>
      </div>
    </div>
  );
};
