import Router from "@koa/router";
import { User, userSchema } from "./models/userSchema";
import { DefaultContext, DefaultState, ParameterizedContext } from "koa";
import { Book } from "./models/bookSchema";

const router = new Router({
  prefix: "/users",
});

router.get("/", async (ctx) => {
  ctx.body = await ctx.db.users.usersWithBooks();
});

router.post(
  "/",
  async (
    ctx: ParameterizedContext<
      DefaultState,
      DefaultContext,
      User | { error: string; details: { field: string; message: string }[] }
    >,
  ) => {
    const newUserData = userSchema.safeParse(ctx.request.body);

    if (!newUserData.success) {
      ctx.status = 400;
      ctx.body = {
        error: "Invalid user data",
        details: newUserData.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      };
      return;
    }

    try {
      const data = await ctx.db.users.create(newUserData.data);
      if (!data) {
        ctx.status = 500;
        ctx.body = {
          error: "Could not insert data",
          details: [],
        };
        return;
      }

      ctx.body = data;
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        error: "Database error",
        details: [{ field: "database", message: (error as Error).message }],
      };
      console.warn(error);
    }
  },
);

router.put(
  "/:id/books",
  async (
    ctx: ParameterizedContext<
      DefaultState,
      DefaultContext,
        {book: Book, user: User} | { error: string; details: { field: string; message: string }[] }
    >,
  ) => {
    const userId = parseInt(ctx.params.id, 10);
    const validUserId = Number.isInteger(userId) && userId > 0;

    const bookId = parseInt(ctx.request.body["book_id"] ?? 0);
    const validBookId = Number.isInteger(bookId) && bookId > 0;

    if (!validBookId || !validUserId) {
      ctx.status = 400;
      ctx.body = {
        error: "Invalid user ID or book ID",
        details: [
          validBookId ? null : { field: "book_id", message: "Invalid book ID" },
          validUserId ? null : { field: "user_id", message: "Invalid user ID" },
        ].filter(Boolean) as { field: string; message: string }[],
      };
      return;
    }

      const user = await ctx.db.users.findOne(userId);
      if (!user) {
          ctx.status = 404;
          ctx.body = { error: "User not found", details: [] };
          return;
      }

      const book = await ctx.db.books.findOne(bookId);
      if (!book) {
          ctx.status = 404;
          ctx.body = { error: "Book not found", details: [] };
          return;
      }

    try {
        await ctx.db.usersBooks.create({ user_id: userId, book_id: bookId });
      ctx.body = {book, user};
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        error: "Could not add book to user",
        details: [{ field: "database", message: (error as Error).message }],
      };
      return;
    }
  },
);

export const userRoutes = router;
