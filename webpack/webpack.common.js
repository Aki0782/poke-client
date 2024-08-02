/* eslint-disable @typescript-eslint/no-require-imports */
// Disables the ESLint rule for requiring imports in TypeScript files.
// This is a common practice in Webpack configuration files.

const path = require("path"); // Node.js module for handling file paths.

const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // Plugin to clean the output directory before each build.
const HtmlWebpackPlugin = require("html-webpack-plugin"); // Plugin to generate an HTML file and inject the output bundles.
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin"); // Plugin to add polyfills for Node.js core modules in the browser.
const webpack = require("webpack"); // Webpack itself, used for additional plugins.

class MyCustomLoggerPlugin {
  // A custom Webpack plugin that logs build stats to the console.
  apply(compiler) {
    compiler.hooks.done.tap("MyCustomLoggerPlugin", (stats) => {
      console.log(
        stats.toString({
          chunks: false, // Makes the build output less verbose.
          colors: true // Shows colored output in the console.
        })
      );
    });
  }
}

module.exports = {
  // Webpack entry point - the starting point of the application.
  entry: "./src/index.tsx",

  // Output configuration.
  output: {
    filename: "[name].[contenthash].js", // Output file name pattern, using contenthash for cache busting.
    path: path.resolve(__dirname, "..", "build"), // Output directory, resolving to the parent directory's build folder.
    publicPath: "/" // Public URL of the output directory when referenced in the browser.
  },

  // Resolve configuration for module imports.
  resolve: {
    modules: [path.resolve(__dirname, "../src"), "node_modules"], // Specifies module resolution paths.
    extensions: [".js", ".jsx", ".ts", ".tsx"], // File extensions that Webpack will resolve.
    fallback: {
      crypto: require.resolve("crypto-browserify"), // Polyfill for Node.js crypto module.
      "process/browser": require.resolve("process/browser") // Polyfill for process module in the browser.
    }
  },

  // Module rules for different file types.
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // Matches .ts and .tsx files.
        use: "ts-loader", // Loader to compile TypeScript files.
        exclude: /node_modules/ // Excludes node_modules directory.
      },
      {
        test: /\.(js|jsx)$/, // Matches .js and .jsx files.
        exclude: /node_modules/, // Excludes node_modules directory.
        use: "babel-loader" // Loader to transpile JavaScript files using Babel.
      },
      {
        test: /\.css$/, // Matches .css files.
        use: ["style-loader", "css-loader", "postcss-loader"] // Loaders to handle CSS files, including PostCSS.
      },
      {
        test: /\.scss$/, // Matches .scss files.
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"] // Loaders to handle SCSS files.
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/, // Matches image files.
        type: "asset/resource" // Handles image files as assets and emits them to the output directory.
      }
    ]
  },

  // Plugins used in the Webpack build process.
  plugins: [
    new NodePolyfillPlugin(), // Adds polyfills for Node.js core modules in the browser.
    new webpack.ProvidePlugin({
      process: "process/browser" // Provides the process polyfill globally.
    }),
    new CleanWebpackPlugin(), // Cleans the build folder before each build.
    new HtmlWebpackPlugin({
      template: "./public/index.html" // Specifies the HTML template to use.
    }),
    new MyCustomLoggerPlugin() // Adds the custom logger plugin to the build process.
  ]
};
