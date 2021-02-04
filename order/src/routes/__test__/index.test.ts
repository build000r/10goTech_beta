import request from "supertest";
import { app } from "../../app";
import { Product } from "../../models/product";
import mongoose from "mongoose";
import { Order } from "../../models/order";

import { natsWrapper } from "../../nats-wrapper";

it("Lists orders of the entire site for admin, and all orders belonging to user for user", async () => {
  const siteTitle = "firm-site";
  const productId = mongoose.Types.ObjectId().toHexString();
  const siteOwnerId = "fjsdakljdfksal";

  global.createSite(siteTitle);

  const product = Product.build({
    id: productId,
    siteOwnerId,
    title: "product",
    siteTitle,
  });

  const productTwo = Product.build({
    id: productId,
    siteOwnerId,
    title: "productTwo",
    siteTitle,
  });

  await product.save();

  await request(app)
    .post("/api/order")
    .set("Cookie", global.signinUserOfFirm(siteTitle))
    .send({ productId: product.id })
    .expect(201);

  await request(app)
    .post("/api/order")
    .set("Cookie", global.signinUserOfFirm(siteTitle))
    .send({ productId: productTwo.id })
    .expect(201);

  await request(app)
    .post("/api/order")
    .set("Cookie", global.signinUserOfFirmTwo(siteTitle))
    .send({ productId: productTwo.id })
    .expect(201);

  const userRes = await request(app)
    .get("/api/order")
    .set("Cookie", global.signinUserOfFirm(siteTitle));

  expect(userRes.body.length).toEqual(2);

  const firmRes = await request(app)
    .get("/api/order")
    .set("Cookie", global.signinFirm(siteTitle));

  expect(firmRes.body.length).toEqual(3);
});
