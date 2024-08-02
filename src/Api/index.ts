import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
// Importing Axios and related types for making HTTP requests.

import { RequestOptions } from "./types/requestTypes";
// Importing a custom type that defines the structure of request options.

import { HTTPMethods } from "Contants";
// Importing HTTP method constants, presumably from a constants file.

export default {
  // Exporting an object with the performRequest function as a default export.

  async performRequest<R, T>(
    options: RequestOptions<T>
  ): Promise<AxiosResponse<R>> {
    // A generic function that performs an HTTP request.
    // R is the type of the response data, T is the type of the request payload.

    const { url, method = HTTPMethods.GET, req, data } = options;
    // Destructuring options to extract URL, method, request, and data.
    // Default method is GET if not provided.

    const token = req?.headers.authorization?.split(" ")[1];
    // Extracting the token from the Authorization header if it exists.
    // Assumes the token is in the format "Bearer <token>".

    // Create Axios request configuration
    const config: AxiosRequestConfig = {
      url,
      method,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {})
        // Conditionally add the Authorization header if the token exists.
      },
      data
      // Including the request payload (data) in the configuration.
    };

    try {
      // Try to make the API request
      const response: AxiosResponse<R> = await axios(config);
      // Await the response and type it as AxiosResponse with the generic type R.

      // Return the response in a structured format
      return response;
    } catch (error) {
      // If an error occurs during the request, catch it
      throw error as AxiosError;
      // Rethrow the error, explicitly typing it as AxiosError.
    }
  }
};
