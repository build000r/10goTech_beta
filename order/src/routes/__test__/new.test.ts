import request from "supertest";
import { app } from "../../app";
import { Product } from "../../models/product";
import mongoose from "mongoose";
import { Order } from "../../models/order";

import { natsWrapper } from "../../nats-wrapper";

it("Requires the user to be authenticated for the site that owns the product", async () => {
  const siteTitle = "firm-site";
  const productId = mongoose.Types.ObjectId().toHexString();

  global.createSite(siteTitle);

  const product = Product.build({
    id: productId,
    siteOwnerId: "fdhsjafhldsa",
    title: "product",
    siteTitle,
  });

  await product.save();

  await request(app)
    .post("/api/order")
    .send({ productId: product.id })
    .expect(401);

  await request(app)
    .post("/api/order")
    .set("Cookie", global.signinUserOfFirm("other-site"))
    .send({ productId: product.id })
    .expect(401);

  const res = await request(app)
    .post("/api/order")
    .set("Cookie", global.signinUserOfFirm(siteTitle))
    .send({ productId: product.id })
    .expect(201);

  expect(res.body.product.siteTitle).toEqual(siteTitle);
});
