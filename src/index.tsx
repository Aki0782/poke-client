import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister"; // Importing a utility to create a storage persister that syncs React Query's cache with a storage medium like localStorage.
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Importing the QueryClient and QueryClientProvider from React Query to manage server state and provide it to the application.
import { persistQueryClient } from "@tanstack/react-query-persist-client"; // Importing the utility to persist and rehydrate the query client's state across sessions.
import { AxiosError } from "axios"; // Importing the AxiosError type to handle errors from Axios requests.
import React from "react"; // Importing React for building the component tree.
import { createRoot } from "react-dom/client"; // Importing createRoot to render the React application into the DOM.
import { BrowserRouter } from "react-router-dom";
// Importing BrowserRouter to manage client-side routing in the application.

import App from "App";
// Importing the main App component.

import "./index.css";
// Importing global CSS styles.

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 24, // Set queries to be considered fresh for 1 day.
      gcTime: 1000 * 60 * 60 * 24 * 2, // Set garbage collection time to 2 days.
      retry: 0, // Disable automatic retries for failed queries.
      refetchOnWindowFocus: true, // Automatically refetch data when the window is refocused.
      throwOnError(error, query) {
        const err = error as AxiosError;

        console.log("query: ", JSON.stringify(query, null, 2));
        console.log("error: ", err.response?.status);
        console.log("message: ", err.message);
        // Custom error handling: Log query details and error information.

        return false;
        // Prevent the error from being re-thrown.
      }
    }
  }
});
// Creating a QueryClient instance with customized default options for managing server state.

const localStoragePersistor = createSyncStoragePersister({
  storage: window.localStorage,
  throttleTime: 1000
});
// Creating a persister that syncs the query client's state with localStorage, throttling updates to every 1 second.

persistQueryClient({
  queryClient,
  persister: localStoragePersistor,
  maxAge: 60 * 60 * 1000
});
// Setting up persistence for the query client, ensuring that query state is saved to localStorage
// and can be restored across browser sessions. The maxAge specifies how long the persisted data is considered valid.

const root = createRoot(document.getElementById("root") as HTMLElement);
// Creating the root of the React application and attaching it to the DOM element with id "root".

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
// Rendering the React application within the root element.
// The application is wrapped with BrowserRouter for routing and QueryClientProvider for managing and persisting server state.
