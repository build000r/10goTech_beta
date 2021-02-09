import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@thesaas/common-rfp";

import { createSiteRouter } from "./routes/new";
import { showSiteRouter } from "./routes/show";
import { indexSiteRouter } from "./routes/index";
import { updateSiteRouter } from "./routes/update";
import { showBySubscriptionRouter } from "./routes/show-by-subscription";
import { deleteSiteRouter } from "./routes/delete";

const app = express();
app.set("trust proxy", true);

app.use(json());

app.use(
  cookieSession({
    signed: false,
    // secure: process.env.NODE_ENV !== "test", DEVELOPMENT MODE
    secure: true,
  })
);

app.use(currentUser);

app.use(showBySubscriptionRouter);
app.use(createSiteRouter);
app.use(showSiteRouter);
app.use(indexSiteRouter);
app.use(updateSiteRouter);
app.use(deleteSiteRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
