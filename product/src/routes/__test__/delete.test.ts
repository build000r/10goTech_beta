import request from "supertest";
import { app } from "../../app";
import { Site } from "../../models/site";
import { Product } from "../../models/product";

it("Requires site ownership of the authenticated user", async () => {
  const userId = "5feb49e727faf8a968c3d7fe";
  const siteId = "5feb49e727faf8a968c3d7fd";

  // create site
  const site = Site.build({
    title: "new-site",
    ownerId: userId,
    id: siteId,
  });

  const productTitle = "name";

  await site.save();

  await request(app)
    .post(`/api/product/${site.title}`)
    .set("Cookie", global.signinFirm(userId))
    .send({ title: productTitle })
    .expect(201);

  await request(app)
    .post(`/api/product/${site.title}`)
    .set("Cookie", global.signinFirm("wrongid"))
    .send({ title: productTitle })
    .expect(401);

  await request(app)
    .delete(`/api/product/${site.title}/${productTitle}`)
    .set("Cookie", global.signinFirm(userId))
    .send({ title: productTitle })
    .expect(204);

  const products = await Product.find({});

  expect(products.length).toEqual(0);
});

it("returns an error if the site or product do not exist", async () => {
  const userId = "5feb49e727faf8a968c3d7fe";
  const siteId = "5feb49e727faf8a968c3d7fd";

  // create site
  const site = Site.build({
    title: "new-site",
    ownerId: userId,
    id: siteId,
  });

  const productTitle = "name";

  await site.save();

  await request(app)
    .post(`/api/product/${site.title}`)
    .set("Cookie", global.signinFirm(userId))
    .send({ title: productTitle })
    .expect(201);

  await request(app)
    .delete(`/api/product/notasite/${productTitle}`)
    .set("Cookie", global.signinFirm(userId))
    .send({ title: productTitle })
    .expect(404);

  await request(app)
    .delete(`/api/product/${site.title}/notaproduct`)
    .set("Cookie", global.signinFirm(userId))
    .send({ title: productTitle })
    .expect(404);

  await request(app)
    .delete(`/api/product/${site.title}/notaproduct`)
    .set("Cookie", global.signinFirm("otheruser"))
    .send({ title: productTitle })
    .expect(401);

  await request(app)
    .delete(`/api/product/${site.title}/${productTitle}`)
    .set("Cookie", global.signinFirm(userId))
    .send({ title: productTitle })
    .expect(204);
});
