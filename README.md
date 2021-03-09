# Node Backend Test Project

Boilerplate code for quick setup for CRUD applications using express/knex/postgres/jest/supertest

##Setup - Detailed Instructions Below

1. Git clone the repo ```git clone [url]``` and remove origin ```git remote remove origin```
2. npm install
3. setup postgres backend
4. Modify .env file to suit your backend and migrate/seed db
  1. migrate tables ```npx knex migrate:latest```
  2. run seeds ```npx knex seed:run```
5. npm run server
6. npm run test
7. modify code to suit your needs

## Setup PostgreSQL

### Homebrew (for macOS users)

If you dont have postgres follow this link (Follow directions until you're able to get into psql utility): https://www.codementor.io/engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb

#### Create dev and test database (Mac)

In terminal run the following commands:

1. ```psql``` -- To get into postgreSQL utility
2. ```CREATE DATABASE todo;``` -- Creates development server
3. ```CREATE DATABASE todo-test;``` -- Creates testing server
4. ```\q```
5. CD into your repo


## Environmental Variables at Runtime

Create a ".env" file at the root of your project and add the following for both DEV and TEST databases

```
    DATABASE_URL=postgres://postgres:password@localhost:5432/todo
```

```
    POSTGRES_TEST_HOST=localhost
    POSTGRES_TEST_PORT=5432
    POSTGRES_TEST_USER=postgres
    POSTGRES_TEST_PASSWORD=password
    POSTGRES_TEST_DATABASE=todo-test
```

## api endpoints
GET     / check server is working

GET     /api/genres Get the list of Genres
GET     /api/genres/:id Get single Genre by Id
POST    /api/genres Add new Genre
PUT     /api/genres/:id Update Genre
DELETE  /api/genres/:id Delete Genre

GET     /api/movies Get the list of Movies
GET     /api/movies/:id Get single Movie by Id
POST    /api/movies Add new Movie
PUT     /api/movies/:id Update Movie
DELETE  /api/movies/:id Delete Movie