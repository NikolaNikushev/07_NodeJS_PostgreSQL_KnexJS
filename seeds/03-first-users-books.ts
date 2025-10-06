import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users_books").del();

  // Inserts seed entries
  await knex("users_books").insert([
    { user_id: 1, book_id: 1 },
    { user_id: 1, book_id: 2 },
    { user_id: 2, book_id: 3 },
    { user_id: 3, book_id: 1 },
    { user_id: 3, book_id: 3 },
    { user_id: 3, book_id: 4 },
    { user_id: 2, book_id: 5 },
    { user_id: 1, book_id: 6 },
    { user_id: 2, book_id: 7 },
    { user_id: 3, book_id: 8 },
    { user_id: 1, book_id: 9 },
    { user_id: 2, book_id: 10 },
    { user_id: 1, book_id: 10 },
  ]);
}
