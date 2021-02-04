import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

declare global {
  namespace NodeJS {
    interface Global {
      createProduct(id: string): string[];
      createSite(title: string): string[];
      signinFirm(id: string): string[];
      signinUserOfFirm(site: string): string[];
      signinUserOfFirmTwo(site: string): string[];
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
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.createSite = (title: string) => {
  const payload = {
    title,
    ownerId: "fdjksafdbsjkafhdjksa",
  };

  const token = jwt.sign(payload, process.env.JWT_KEY!);
  const session = { jwt: token };
  const sessionJSON = JSON.stringify(session);
  const base64 = Buffer.from(sessionJSON).toString("base64");

  return [`express:sess=${base64}`];
};

global.createProduct = (id: string) => {
  const payload = {
    id,
    title: "product-title",
  };

  const token = jwt.sign(payload, process.env.JWT_KEY!);
  const session = { jwt: token };
  const sessionJSON = JSON.stringify(session);
  const base64 = Buffer.from(sessionJSON).toString("base64");

  return [`express:sess=${base64}`];
};

global.signinFirm = (id: string) => {
  const payload = {
    id,
    email: "admin@consultant.com",
    userOfSite: "rfp",
    createSitePermission: true,
  };

  const token = jwt.sign(payload, process.env.JWT_KEY!);
  const session = { jwt: token };
  const sessionJSON = JSON.stringify(session);
  const base64 = Buffer.from(sessionJSON).toString("base64");

  return [`express:sess=${base64}`];
};

global.signinUserOfFirm = (site: string) => {
  const payload = {
    id: "fdsa123jfdsajk",
    email: "client@gmail.com",
    userOfSite: site,
    createSitePermission: false,
  };

  const token = jwt.sign(payload, process.env.JWT_KEY!);
  const session = { jwt: token };
  const sessionJSON = JSON.stringify(session);
  const base64 = Buffer.from(sessionJSON).toString("base64");

  return [`express:sess=${base64}`];
};

global.signinUserOfFirmTwo = (site: string) => {
  const payload = {
    id: "fdhsajkfhdsjkahfdjskah",
    email: "otherclient@gmail.com",
    userOfSite: site,
    createSitePermission: false,
  };

  const token = jwt.sign(payload, process.env.JWT_KEY!);
  const session = { jwt: token };
  const sessionJSON = JSON.stringify(session);
  const base64 = Buffer.from(sessionJSON).toString("base64");

  return [`express:sess=${base64}`];
};
