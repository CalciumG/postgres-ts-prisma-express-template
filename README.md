# Example App

This is an example Node.js application using Express, TypeScript, and Prisma ORM. The application is set up to be deployed with Neon.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Deploying to Neon](#deploying-to-neon)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed. You can download them from [Node.js](https://nodejs.org/).
- PostgreSQL database. This example uses [Neon](https://neon.tech/), a serverless Postgres service.
- Prisma CLI installed globally. You can install it using npm:

  ```bash
  npm install -g prisma
  ```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file:

```plaintext
# .env
DATABASE_URL="postgres://[user]:[password]@[neon_hostname]/[dbname]?sslmode=require"
```

Replace [user], [password], [neon_hostname], and [dbname] with your actual database credentials provided by Neon.

## API Documentation

The API documentation is generated using OpenAPI and can be accessed via Swagger UI.

1. Start the server.
2. Navigate to http://localhost:3000/api-docs in your browser to view the API documentation.

## Deploying to Neon

To deploy this application to Neon, follow these steps:

1. Set up a new Neon project and retrieve your database connection string.

2. Update the DATABASE_URL in your .env file with the connection string from Neon.

3. Deploy the Prisma migrations to the Neon database:

```bash
npx prisma migrate deploy
```

4. Start the application:

```bash
npm start
```

5. Make sure the prisma client is generated:

```bash
npx prisma generate
```
