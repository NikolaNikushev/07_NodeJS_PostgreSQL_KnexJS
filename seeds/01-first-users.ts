import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      id: 1,
      username: "BobiZai",
      first_name: "Bob",
      last_name: "Zaikov",
      birth_date: "2001-10-01",
      password: "Zaikov2001",
    },
    {
      id: 2,
      username: "John",
      first_name: "John",
      last_name: "Do",
      birth_date: "1976-05-20",
      password: "12345678",
    },
    {
      id: 3,
      username: "ShoSmith1",
      first_name: "Sho",
      last_name: "Smith",
      birth_date: "1998-03-10",
      password: "ShoSmith1",
    },
  ]);
}
