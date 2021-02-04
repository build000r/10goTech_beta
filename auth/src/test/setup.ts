import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";
import { createGod } from "./god";

declare global {
  namespace NodeJS {
    interface Global {
      signin(): Promise<{ userId: string; cookie: string[] }>;
    }
  }
}

jest.mock("../nats-wrapper");

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "afafads";

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = async () => {
  await createGod();

  const user = await request(app)
    .post("/api/users/signup/rfp")
    .send({
      email: "test@test.com",
      password: "password",
      name: "name",
      phone: "4846782211",
    })
    .expect(200);

  const res = await request(app)
    .post(`/api/users/activate/${user.body.token}`)
    .expect(201);

  const cookie = res.get("Set-Cookie");

  const userId = res.body.id;

  return { userId, cookie };
};
