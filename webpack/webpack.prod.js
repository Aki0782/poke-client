/* eslint-disable @typescript-eslint/no-require-imports */
// Disables the ESLint rule for requiring imports in TypeScript files, which is standard in Webpack configuration files.

const Dotenv = require("dotenv-webpack"); // Plugin for loading environment variables from a .env file.
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Plugin to extract CSS into separate files.
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); // Plugin to optimize and minimize CSS assets.
const TerserPlugin = require("terser-webpack-plugin"); // Plugin to optimize and minimize JavaScript assets.
const { merge } = require("webpack-merge"); // Utility to merge Webpack configurations.

const common = require("./webpack.common.js"); // Import the common configuration to merge with production-specific settings.

module.exports = merge(common, {
  // Set the mode to production, enabling optimizations like minification and tree-shaking.
  mode: "production",

  // Generate source maps for debugging production code.
  devtool: "source-map",

  // Module rules for handling CSS and SCSS in production.
  module: {
    rules: [
      {
        test: /\.css$/, // Matches .css files.
        use: [
          MiniCssExtractPlugin.loader, // Extracts CSS into separate files instead of injecting into the DOM.
          "css-loader", // Resolves CSS imports and handles URL resolution.
          "postcss-loader" // Processes CSS with PostCSS (e.g., for autoprefixing).
        ]
      },
      {
        test: /\.scss$/, // Matches .scss files.
        use: [
          MiniCssExtractPlugin.loader, // Extracts SCSS into separate files.
          "css-loader", // Resolves SCSS imports and handles URL resolution.
          "postcss-loader", // Processes SCSS with PostCSS.
          "sass-loader" // Compiles SCSS to CSS.
        ]
      }
    ]
  },

  // Plugins used in the production build process.
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css" // Output file name pattern for the extracted CSS, using contenthash for cache busting.
    }),
    new Dotenv({
      path: "./.env.production" // Load environment variables specifically from the .env.production file.
    })
  ],

  // Optimization settings for the production build.
  optimization: {
    minimize: true, // Enable minimization of the output files.
    minimizer: [
      new TerserPlugin(), // Minimize JavaScript files using Terser.
      new OptimizeCSSAssetsPlugin() // Optimize and minimize CSS files.
    ],
    splitChunks: {
      chunks: "all" // Split vendor and common code into separate chunks for better caching.
    }
  }
});
