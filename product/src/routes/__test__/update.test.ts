import request from "supertest";
import { app } from "../../app";
import { Site } from "../../models/site";
import { Product } from "../../models/product";

it("Requires site ownership of the authenticated user to update a product", async () => {
  const userId = "5feb49e727faf8a968c3d7fe";
  const siteId = "5feb49e727faf8a968c3d7fd";

  // create site
  const site = Site.build({
    title: "new-site",
    ownerId: userId,
    id: siteId,
  });

  await site.save();

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
    .put(`/api/product/${site.title}/title1`)
    .set("Cookie", global.signinFirm(userId))
    .send({ title: "title2" })
    .expect(400);

  await request(app)
    .put(`/api/product/${site.title}/title1`)
    .set("Cookie", global.signinFirm(userId))
    .send({ title: "title3" })
    .expect(200);

  const products = await Product.find({});

  expect(products[0].title).toEqual("title3");
});

it("Enforces a unique combination of product title per site", async () => {
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
    .send({ title: "title1" })
    .expect(400);

  await request(app)
    .post(`/api/product/${site1.title}`)
    .set("Cookie", global.signinFirm(userId))
    .send({ title: "title2" })
    .expect(201);

  await request(app)
    .post(`/api/product/${site1.title}`)
    .set("Cookie", global.signinFirm(userId))
    .send({ title: "title2" })
    .expect(400);

  const res = await request(app).get(`/api/product/${site.title}`).expect(200);
  const res1 = await request(app)
    .get(`/api/product/${site1.title}`)
    .expect(200);

  expect(res.body.length).toEqual(1);
  expect(res1.body.length).toEqual(1);
});

it("returns an error if the site does not exist", async () => {
  const userId = "5feb49e727faf8a968c3d7fe";
  const siteId = "5feb49e727faf8a968c3d7fd";

  // create site
  const site = Site.build({
    title: "new-site",
    ownerId: userId,
    id: siteId,
  });

  await site.save();

  await request(app)
    .post(`/api/product/madeupsitename`)
    .set("Cookie", global.signinFirm(userId))
    .send({ title: "title0" })
    .expect(404);
});

it("implements optimistic concurrency control", async (done) => {
  // create product
  const product = Product.build({
    title: "helao",
  });
  // save product
  await product.save();

  // fetch product x2
  const firstInstance = await Product.findById(product.id);
  const secondInstance = await Product.findById(product.id);

  // make changes x2
  firstInstance!.set({ title: "what" });
  secondInstance!.set({ title: "fdjsakhfdsjkab" });

  // save first fetched ticket
  await firstInstance!.save();
  expect(firstInstance!.version).toEqual(1);
  await firstInstance!.save();
  expect(firstInstance!.version).toEqual(2);

  // save second fetched ticket (expect version issues)
  try {
    await secondInstance!.save();
  } catch (error) {
    return done();
  }

  throw new Error("Should not reach this point");
});
