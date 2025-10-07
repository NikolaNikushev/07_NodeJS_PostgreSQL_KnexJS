import {Repository} from "./Repository";
import {UserBook} from "../models/userBookSchema";

export class UsersBooksRepository extends Repository<UserBook> {
    tableName = "users_books";
}