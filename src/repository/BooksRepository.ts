import { Book } from "../models/bookSchema";
import {Repository} from "./Repository";

export class BooksRepository extends Repository<Book> {
    tableName = "books";
}