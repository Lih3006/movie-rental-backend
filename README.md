# Movie Rental Service API

The project involved building an API for a movie rental service using TypeScript, Node.js, Express, PG, and PostgreSQL. The manager of a movie rental service had requested the creation of this API to manage their movie collection for a streaming platform.

## Delivery Requirements

- Code had to be written in TypeScript.
- TypeORM 
- A PostgreSQL database was used for development.
- Specific table and column naming conventions were strictly followed.
- A folder with SQL files for table creation and a table diagram was included.
- Files were organized according to the discussed structure.

## Table Specifications

**Table Name**: movies

| Column   | Specifications                             |
|----------|--------------------------------------------|
| id       | integer, auto-incremented, and primary key.|
| name     | string of size 50 and not null.            |
| category | string of size 20 and not null.            |
| duration | integer and not null.                      |
| price    | integer and not null.                      |

## Application Endpoints

- **POST /movies**: Create movies.
- **GET /movies**: List all movies or filter by category.
- **GET /movies/:id**: Search for a movie by ID.
- **PATCH /movies/:id**: Update a movie by ID.
- **DELETE /movies/:id**: Delete a movie by ID.

## Application Rules

- **GET /movies**: Ability to list all movies or filter by category.
- Error handling implemented for non-existent movie IDs and duplicate movie names.

This API provided essential functionalities for managing movies in a rental service.
