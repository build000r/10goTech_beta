import mongoose from "mongoose";
import { app } from "./app";
import { SiteUpdatedListener } from "./events/listeners/site-updated-listener";
import { SiteCreatedListener } from "./events/listeners/site-created-listener";
import { natsWrapper } from "./nats-wrapper";

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

    new SiteCreatedListener(natsWrapper.client).listen();
    new SiteUpdatedListener(natsWrapper.client).listen();

    console.log(process.env.MONGO_URI);

    await mongoose.connect(
      process.env.MONGO_URI + "/auth?retryWrites=true&w=majority",
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
    console.log("Listening on port 3000");
  });
};

start();

// value: "mongodb+srv://dbUser:F7VI9q8mFVGu7YV7@cluster0.1oywp.mongodb.net/auth?retryWrites=true&w=majority"
// value: "mongodb+srv://user:pt6Hxfs9CMwLPYK4@cluster0.1oywp.mongodb.net/auth?retryWrites=true&w=majority"
