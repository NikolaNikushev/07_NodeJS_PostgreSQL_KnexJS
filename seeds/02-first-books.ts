import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("books").del();

  // Inserts seed entries
  await knex("books").insert([
    {
      id: 1,
      name: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      year: "1925",
    },
    {
      id: 2,
      name: "To Kill a Mockingbird",
      author: "Harper Lee",
      year: "1960",
    },
    { id: 3, name: "1984", author: "George Orwell", year: "1949" },
    { id: 4, name: "Pride and Prejudice", author: "Jane Austen", year: "1813" },
    {
      id: 5,
      name: "The Catcher in the Rye",
      author: "J.D. Salinger",
      year: "1951",
    },
    { id: 6, name: "The Hobbit", author: "J.R.R. Tolkien", year: "1937" },
    { id: 7, name: "Fahrenheit 451", author: "Ray Bradbury", year: "1953" },
    { id: 8, name: "The Lord of the Rings", author: "J.R.R. Tolkien", year: "1954" },
    { id: 9, name: "Emma", author: "Jane Austen", year: "1815" },
    { id: 10, name: "The Silmarillion", author: "J.R.R. Tolkien", year: "1977" },
  ]);
}
