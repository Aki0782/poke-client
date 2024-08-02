/* eslint-disable @typescript-eslint/no-require-imports */
// Disables the ESLint rule for requiring imports in TypeScript files, which is common in Webpack configuration files.

// Node.js path module for handling and transforming file paths.
const path = require("path");

// Load environment variables from a .env file.
const dotenv = require("dotenv");

// Webpack plugin for loading environment variables.
const Dotenv = require("dotenv-webpack");

// Utility function to merge Webpack configurations.
const { merge } = require("webpack-merge");

// Common Webpack configuration that will be merged with the development-specific configuration.
const common = require("./webpack.common.js");

// Load environment variables from the .env.development file.
dotenv.config({
  path: "./.env.development"
});

module.exports = merge(common, {
  // Set the mode to development, enabling useful tools for development like more detailed error messages.
  mode: "development",

  // Generate source maps for easier debugging by mapping the compiled code back to the original source code.
  devtool: "inline-source-map",

  // Configuration for the Webpack development server.
  devServer: {
    port: process.env.PORT, // Port on which the development server will run, loaded from environment variables.
    compress: true, // Enables gzip compression for responses to improve performance.
    hot: true, // Enables hot module replacement, allowing live reloading of modules without a full page refresh.
    static: path.join(__dirname, "..", "build"), // Serve static files from the build directory.
    open: true, // Automatically open the browser after the server starts.
    historyApiFallback: true // Redirects 404s to /index.html, useful for single-page applications with client-side routing.
  },

  // Plugins used in the Webpack build process.
  plugins: [
    new Dotenv({
      path: "./.env.development" // Load environment variables specifically from the .env.development file.
    })
  ]
});
