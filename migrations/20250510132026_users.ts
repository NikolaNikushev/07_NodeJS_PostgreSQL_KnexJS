import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", function (table) {
    table.increments("id");

    // Our login fields
    table.string("username", 255).notNullable().unique();
    table.string("password", 255).notNullable();

    // Add more descriptive fields for user profiles
    table.string("first_name", 255).notNullable();
    table.string("last_name", 255).notNullable();
    table.date("birth_date").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users");
}
