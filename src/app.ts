import Koa, { Context } from "koa";
import Router from "@koa/router";
import helmet from "koa-helmet";
import koaBody from "@koa/bodyparser";
import { userRoutes } from "./userRoutes";
const app = new Koa();

const router = new Router();

router.get("/", (ctx: Context) => {
  ctx.body = "Hello World";
});

app.use(helmet());
app.use(koaBody());

app.use(router.routes());
app.use(userRoutes.routes());

app.listen(3000, () => {
  console.log(__dirname, __filename);
  console.log("Server is running on port 3000");
});
