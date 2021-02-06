import mongoose from "mongoose";
import { app } from "./app";
import { OrderCreatedListener } from "./events/listeners/order-created-listener";
import { SiteUpdatedListener } from "./events/listeners/site-updated-listener";
import { SiteCreatedListener } from "./events/listeners/site-created-listener";
import { UserActivatedListener } from "./events/listeners/user-activated-listener";
import { UserSignupListener } from "./events/listeners/user-signup-listener";
import { natsWrapper } from "./nats-wrapper";
import { ProductCreatedListener } from "./events/listeners/product-created-listener";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined.");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined.");
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS_CLIENT_ID must be defined.");
  }
  if (!process.env.NATS_URL) {
    throw new Error("NATS_URL must be defined.");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER_ID must be defined.");
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed.");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    new UserSignupListener(natsWrapper.client).listen();
    new UserActivatedListener(natsWrapper.client).listen();
    new SiteCreatedListener(natsWrapper.client).listen();
    new SiteUpdatedListener(natsWrapper.client).listen();
    new OrderCreatedListener(natsWrapper.client).listen();
    new ProductCreatedListener(natsWrapper.client).listen();

    await mongoose.connect(
      process.env.MONGO_URI + "/notification?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );
  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000.");
  });
};

start();
