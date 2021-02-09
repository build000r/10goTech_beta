import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@thesaas/common-rfp";
import { showBySubscriptionRouter } from "./routes/show";
import { updateEmailRouter } from "./routes/update";

// import { createNotificationRouter } from "./routes/new";
// import { showNotificationRouter } from "./routes/show";
// import { indexNotificationRouter } from "./routes/index";
// import { updateNotificationRouter } from "./routes/update";

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
app.use(updateEmailRouter);
// app.use(createNotificationRouter);
// app.use(showNotificationRouter);
// app.use(indexNotificationRouter);
// app.use(updateNotificationRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
