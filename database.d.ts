// add typing for the context to know it exists and not refer to "any"
import {UsersRepository} from "./src/repository/UsersRepository";
import {BooksRepository} from "./src/repository/BooksRepository";
import {UsersBooksRepository} from "./src/repository/UsersBooksRepository";

declare module "koa" {
    interface DefaultContext {
        db: {
            users: UsersRepository,
            books: BooksRepository,
            usersBooks: UsersBooksRepository,
        }
    }
}