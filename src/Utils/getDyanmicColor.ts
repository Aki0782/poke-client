import { FastAverageColor } from "fast-average-color";
// Importing the FastAverageColor library, which is used to calculate the average color of an image.

export const getDynamicColor = async (url: string): Promise<string> => {
  // An asynchronous function that takes an image URL as input and returns a hex color string.

  const fastAverageColor = new FastAverageColor();
  // Creating an instance of FastAverageColor.

  const color = await fastAverageColor.getColorAsync(url);
  // Using the getColorAsync method to asynchronously fetch the average color from the image at the provided URL.

  return color.hex;
  // Returning the average color as a hex string.
};
