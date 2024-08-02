import { create } from "zustand";
// Importing the `create` function from the Zustand library to create a state management store.

export type ContextTypes = {
  selectedItem: {
    name: string;
    url: string;
    number: number;
  };
  // Type definition for the `selectedItem` object, which includes the Pokémon's name, URL, and entry number.

  setSelectedItem: (item: {
    name: string;
    url: string;
    number: number;
  }) => void;
  // Type definition for the `setSelectedItem` function, which updates the `selectedItem` state.
};

type InitialStateTypes = Omit<ContextTypes, "setSelectedItem">;
// Type definition for the initial state, excluding the `setSelectedItem` function.

export const initialState: InitialStateTypes = {
  selectedItem: {
    name: "",
    url: "",
    number: 0
  }
  // Initial state definition where `selectedItem` is initialized with empty values.
};

export const useZustand = create<ContextTypes>((set) => ({
  ...initialState,
  // Spreading the initial state into the Zustand store.

  setSelectedItem: (item) => set({ selectedItem: item })
  // Defining the `setSelectedItem` function, which updates the `selectedItem` state using the `set` function provided by Zustand.
}));
