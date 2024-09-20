**README.md**

# Payment App Server-Side

## Overview

This repository includes the server-side components for a payment application. It provides functionality for user management, account creation, and basic account operations.

## Architecture

The repository is organized into the following modules:

* `db.js`: Handles database operations using MongoDB.
* `index.js`: Configures the Express server and API routes.
* `middleware.js`: Provides authentication middleware for API routes.
* `routes/index.js`: Defines API routes for user management and account operations.

## Environment Variables

The following environment variable is required:

* `DATABASE_URL`: URL for the MongoDB database.

## Configuration

To configure the server:

1. Create a `.env` file in the root directory with the `DATABASE_URL` environment variable.
2. Update the value of `JWT_SECRET` in `config.js` to a secure secret for JWT token generation.

## Usage

1. Install the dependencies with `npm install`.
2. Run the server with `npm run dev`.
3. Access the API routes as follows:

| Route | HTTP Method | Description |
|---|---|---|
| `/api/v1/users` | POST | Create a new user |
| `/api/v1/users/login` | POST | Log in a user and generate a JWT token |
| `/api/v1/accounts` | POST | Create a new account for a user |
| `/api/v1/accounts/:id` | GET | Get account details for a user |
| `/api/v1/accounts/:id/deposit` | POST | Deposit money into an account |
| `/api/v1/accounts/:id/withdraw` | POST | Withdraw money from an account |

## Authentication

All API routes require authentication via a JWT token. To obtain a token, log in a user with a valid username and password using the `/api/v1/users/login` route. The token should be included in the `Authorization` header of subsequent requests as `Bearer <token>`.

## Middleware

The `authMiddleware` in `middleware.js` verifies JWT tokens and attaches the user's ID to the request object. It is used by all API routes to ensure authorized access.

## Troubleshooting

* If you encounter issues connecting to the database, check your `.env` file and ensure that `DATABASE_URL` is set correctly.
* If you receive a "decoding error" when using API routes, verify that the `JWT_SECRET` in `config.js` matches the secret used to generate the token.
* If you encounter any other issues, please refer to the comments in the source code or create an issue on GitHub.