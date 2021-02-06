import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@thesaas/common-rfp";

import { indexProductRouter } from "./routes/index";
import { updateProductRouter } from "./routes/update";
import { showProductRouter } from "./routes/show";
import { deleteProductRouter } from "./routes/delete";
import { createProductRouter } from "./routes/new";

const app = express();
app.set("trust proxy", true);

app.use(json());

app.use(
  cookieSession({
    signed: false,
    // secure: process.env.NODE_ENV !== "test", DEVELOPMENT MODE
    secure: false,
  })
);

app.use(currentUser);

app.use(indexProductRouter);
app.use(createProductRouter);
app.use(deleteProductRouter);
app.use(showProductRouter);
app.use(updateProductRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
