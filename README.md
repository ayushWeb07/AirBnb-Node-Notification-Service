# starter-express-ts-server

A minimal **Express.js + TypeScript starter template** to quickly
bootstrap scalable and maintainable backend APIs.\
It provides a clean project structure, TypeScript configuration, and a
simple setup so you can focus on building features instead of
configuring the backend.

------------------------------------------------------------------------

## Features

-   ⚡ Express.js server setup
-   🧠 Full TypeScript support
-   📁 Clean and scalable folder structure
-   🔧 Easy to extend for REST APIs
-   🚀 Quick development setup

------------------------------------------------------------------------

## Project Structure

    starter-express-ts-server
    │
    ├── src
    │   ├── controllers     # Route controllers
    │   ├── routers          # API routes
    │   ├── utils        # Utility functions
    │   ├── validators        # ZOD validators
    │   ├── middlewares      # Custom middlewares
    │   ├── config          # App configuration
    │   └── index.ts       # Entry point
    │
    ├── logs                # All the logs by winston
    ├── package.json
    ├── tsconfig.json
    └── README.md

------------------------------------------------------------------------

## Installation

Clone the repository:

``` bash
git clone https://github.com/ayushWeb07/starter-express-ts-server.git
cd starter-express-ts-server
```

Install dependencies:

``` bash
pnpm install
```

Add `.env file`:

```bash
PORT=3000
```

------------------------------------------------------------------------

## Development

Run the development server:

``` bash
pnpm run dev
```

Build the project:

``` bash
pnpm run build
```

Run the production build:

``` bash
pnpm start
```

------------------------------------------------------------------------

## Why This Template?

Setting up **Express + TypeScript** from scratch repeatedly can be
time-consuming.\
This starter provides a **simple and organized starting point** for
building backend services with good development practices.
