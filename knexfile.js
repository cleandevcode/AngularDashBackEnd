require ('custom-env').env();
require("dotenv").config();

const pg = require("pg");
const path = require('path')
const PostgresConnectionStringParser = require('pg-connection-string');

const connectionOptions = PostgresConnectionStringParser.parse(process.env.DATABASE_URL);

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: connectionOptions.host,
      port: Number(connectionOptions.port),
      user: connectionOptions.user,
      password: connectionOptions.password,
      database: connectionOptions.database,
      connectTimeout: 90000,
      ssl: { 
        rejectUnauthorized: false 
      },
    },
    debug: true,
    pool: {
      min: 1,
      max: 20,
    },
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  },

  test: {
    client: "pg",
    connection: {
      host: process.env.POSTGRES_TEST_HOST,
      port: process.env.POSTGRES_TEST_PORT,
      user: process.env.POSTGRES_TEST_USER,
      password: process.env.POSTGRES_TEST_PASSWORD,
      database: process.env.POSTGRES_TEST_DATABASE,
      connectTimeout: 90000,
    },
    migrations: {
        directory: path.join(__dirname, 'database/migrations'),
    },
    seeds: {
        directory: path.join(__dirname, 'database/seeds'),
    },
  },

  production: {
    client: "pg",
    // useNullAsDefault: true,
    connection: {
      host: connectionOptions.host,
      port: Number(connectionOptions.port),
      user: connectionOptions.user,
      password: connectionOptions.password,
      database: connectionOptions.database,
      connectTimeout: 90000,
      ssl: { 
        rejectUnauthorized: false 
      },
    },

    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  }
};
