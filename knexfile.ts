import type { Knex } from "knex";
import {dbConnectionSetup} from "./config/knex";

const migrations = {
  tableName: "knex_migrations", // Stored on database level for history
  extension: "ts", // Specify the file extension for migration files
};

const config: { [key: string]: Knex.Config } = {
  development: {
    client: dbConnectionSetup.client,
    connection: dbConnectionSetup.connection,
    pool: {
      min: 2,
      max: 10,
    },
    migrations,
  },

  production: {
    client: dbConnectionSetup.client,
    connection: dbConnectionSetup.connection,
    pool: {
      min: 2,
      max: 10,
    },
    migrations,
  },
};

module.exports = config;
