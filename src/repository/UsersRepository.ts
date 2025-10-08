import {Repository} from "./Repository";
import {User} from "../models/userSchema";
import {Book} from "../models/bookSchema";

export class UsersRepository extends Repository<User> {
    tableName = "users";

    public usersWithBooks(): Promise<(User & { books: Book[] })[]> {
        return this.qb
            .leftJoin("users_books", "users.id", "users_books.user_id")
            .leftJoin("books", "users_books.book_id", "books.id")
            .select("users.*", this.db.raw("json_agg(books.*) as books"))
            .groupBy("users.id")
            .orderBy("users.id", "asc")
    }
}