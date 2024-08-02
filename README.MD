# Poke-Client

Poke-Client is a React-based web application that displays information about Pokémon. It leverages modern web technologies such as React, TypeScript, Zustand for state management, and React Query for data fetching and caching. The application is built using Webpack and supports environment-specific configurations and persistent data across sessions.

## Table of Contents

- [Getting Started]
- [Project Structure]
- [Scripts]
- [Environment Variables]
- [Technologies]
- [Code Quality]

## Getting Started

### Prerequisites

Ensure that you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Yarn](https://yarnpkg.com/) (v1.22.19 or higher)

### Installation

Clone the repository and install the dependencies using Yarn:

```bash
yarn install && yarn start
```


poke-client/
│
├── src/
│   ├── Components/
│   ├── Hooks/
│   ├── Api/
│   ├── App.tsx
│   └── index.tsx
│
├── webpack/
│   ├── webpack.common.js
│   ├── webpack.dev.js
│   └── webpack.prod.js
│
├── .babelrc
├── .eslintrc.js
├── .prettierrc
├── tsconfig.json
├── package.json
└── README.md


## Key Files and Directories

- **src/**: Contains the source code of the application.
  - **Components/**: Reusable React components.
  - **Hooks/**: Custom hooks used throughout the application.
  - **Api/**: API-related logic, such as request creation and data fetching.
  - **index.tsx**: The entry point for the React application.
  - **App.tsx**: The main application component.

- **webpack/**: Contains Webpack configurations for different environments.
  - **webpack.common.js**: Common configuration shared between development and production.
  - **webpack.dev.js**: Configuration specific to development.
  - **webpack.prod.js**: Configuration specific to production.

- **.babelrc**: Babel configuration file.

- **.eslintrc.js**: ESLint configuration file.

- **.prettierrc**: Prettier configuration file.

- **tsconfig.json**: TypeScript configuration file.

- **package.json**: Contains project metadata, dependencies, and scripts.

## Scripts

The following scripts are available in the `package.json`:

- **start**: Runs the development server with Webpack Dev Server.
```bash
  yarn start
  ```

- **build**: Creates a production build of the application.
  ```bash
  yarn build
  ```

## Environment Variables

The application uses environment variables for configuration. The environment variables are loaded using the `dotenv` package.

Create a `.env.development` file for development and a `.env.production` file for production with the following variables:


## Technologies

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **Zustand**: A small, fast, and scalable state management solution.
- **React Query**: A library for fetching, caching, and updating asynchronous data in React.
- **Axios**: A promise-based HTTP client for making API requests.
- **TailwindCSS**: A utility-first CSS framework for styling.

### Tooling

- **Webpack**: A module bundler for JavaScript applications.
- **Babel**: A JavaScript compiler that allows you to use the latest JavaScript syntax.
- **ESLint**: A tool for identifying and fixing problems in JavaScript code.
- **Prettier**: A code formatter that enforces consistent style.
- **Typescript ESLint**: Linting and formatting for TypeScript using ESLint.

## Code Quality

### Linting and Formatting

This project uses ESLint and Prettier to maintain code quality. The configuration is set up to integrate with both JavaScript and TypeScript, as well as to enforce consistent styling using Prettier.