import express from "express";
import "express-async-errors";
import { json } from "body-parser";

import cookieSession from "cookie-session";

import { accountActivationRouter } from "./routes/account-activation";
import { currentUserRouter } from "./routes/current-user";
import { forgotPasswordRouter } from "./routes/forgot-password";
import { resetPasswordRouter } from "./routes/reset-password";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

import { errorHandler, NotFoundError } from "@thesaas/common-rfp";
import { userBySiteRouter } from "./routes/users-by-site";

const app = express();
app.set("trust proxy", true);

app.use(json());

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(userBySiteRouter);
app.use(accountActivationRouter);
app.use(currentUserRouter);
app.use(forgotPasswordRouter);
app.use(resetPasswordRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
