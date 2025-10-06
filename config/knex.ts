import knex from "knex";
import dotenv from "dotenv";
dotenv.config();

const setup = {
  client: "pg",
  connection: {
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_DB_PORT) || 5432,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
};
export const dbConnectionSetup = setup;
export const db = knex(setup);
