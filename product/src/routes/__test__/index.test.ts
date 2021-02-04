import request from "supertest";
import { app } from "../../app";
import { Site } from "../../models/site";
import mongoose from "mongoose";

import { natsWrapper } from "../../nats-wrapper";
import { Product } from "../../models/product";

it("Returns a list of products for a specific site", async () => {
  const userId = "5feb49e727faf8a968c3d7fe";
  const siteId = "5feb49e727faf8a968c3d7fd";
  const siteId1 = "5feb596e76aa54ac6866ad7b";

  const site = Site.build({
    title: "new-site",
    ownerId: userId,
    id: siteId,
  });
  await site.save();

  const site1 = Site.build({
    title: "new-site1",
    ownerId: userId,
    id: siteId1,
  });

  await site1.save();

  await request(app)
    .post(`/api/product/${site.title}`)
    .set("Cookie", global.signinFirm(userId))
    .send({ title: "title1" })
    .expect(201);

  await request(app)
    .post(`/api/product/${site.title}`)
    .set("Cookie", global.signinFirm(userId))
    .send({ title: "title2" })
    .expect(201);

  await request(app)
    .post(`/api/product/${site.title}`)
    .set("Cookie", global.signinFirm(userId))
    .send({ title: "title3" })
    .expect(201);

  await request(app)
    .post(`/api/product/${site1.title}`)
    .set("Cookie", global.signinFirm(userId))
    .send({ title: "title1" })
    .expect(201);

  const res = await request(app).get(`/api/product/${site.title}`).expect(200);

  expect(res.body.length).toEqual(3);
});

it("Returns an error if the site does not exist", async () => {
  const userId = "5feb49e727faf8a968c3d7fe";
  const siteId = "5feb49e727faf8a968c3d7fd";
  const siteId1 = "5feb596e76aa54ac6866ad7b";

  const site = Site.build({
    title: "new-site",
    ownerId: userId,
    id: siteId,
  });
  await site.save();

  const site1 = Site.build({
    title: "new-site1",
    ownerId: userId,
    id: siteId1,
  });

  await site1.save();

  await request(app)
    .post(`/api/product/${site.title}`)
    .set("Cookie", global.signinFirm(userId))
    .send({ title: "title1" })
    .expect(201);

  await request(app)
    .post(`/api/product/${site.title}`)
    .set("Cookie", global.signinFirm(userId))
    .send({ title: "title2" })
    .expect(201);

  await request(app)
    .post(`/api/product/${site.title}`)
    .set("Cookie", global.signinFirm(userId))
    .send({ title: "title3" })
    .expect(201);

  await request(app)
    .post(`/api/product/${site1.title}`)
    .set("Cookie", global.signinFirm(userId))
    .send({ title: "title1" })
    .expect(201);

  await request(app).get(`/api/product/madeupsitetitle`).expect(404);
});
