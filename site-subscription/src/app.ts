import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@thesaas/common-rfp";

import { showPackagesRouter } from "./routes/show-packages";
import { showPackageRouter } from "./routes/show-package";
import { subscribeRouter } from "./routes/subscribe";
import { showSubscriptionRouter } from "./routes/show-subscription";
import { showSubscriptionsRouter } from "./routes/show-subscriptions";
import { updateCardRouter } from "./routes/update-card";

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

app.use(updateCardRouter);
app.use(showSubscriptionRouter);
app.use(showPackageRouter);
app.use(showPackagesRouter);
app.use(subscribeRouter);
app.use(showSubscriptionsRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
