import request from "supertest";
import { app } from "../../app";
import { Site } from "../../models/site";

import { natsWrapper } from "../../nats-wrapper";

it("Can only be accessed by an authenticated user, with createSitePermission", async () => {
  await request(app)
    .post("/api/site")
    .set("Cookie", global.signinGod())
    .send({ title: "rfp" })
    .expect(201);

  await request(app)
    .post("/api/site")
    .set("Cookie", global.signinFirm())
    .send({ title: "second-site" })
    .expect(201);

  await request(app)
    .post("/api/site")
    .set("Cookie", global.signinUserOfFirm())
    .send({ title: "third-site" })
    .expect(401);
});

it("Returns an error if invalid parameters are provided", async () => {
  await request(app)
    .post("/api/site")
    .set("Cookie", global.signinFirm())
    .send({
      title: "I have spaces",
    })
    .expect(400);

  await request(app)
    .post("/api/site")
    .set("Cookie", global.signinFirm())
    .send({
      title: "I*have#Special@characters",
    })
    .expect(400);

  await request(app)
    .post("/api/site")
    .set("Cookie", global.signinFirm())
    .send({
      title: "I*have#Special@characters",
    })
    .expect(400);
});

it("Creates a new site, if that site has a unique title with alphanumeric characters or dashes.", async () => {
  let sites = await Site.find({});
  expect(sites.length).toEqual(0);

  await request(app)
    .post("/api/site")
    .set("Cookie", global.signinFirm())
    .send({
      title: "first-site",
    })
    .expect(201);

  await request(app)
    .post("/api/site")
    .set("Cookie", global.signinFirm())
    .send({
      title: "first-site",
    })
    .expect(400);

  await request(app)
    .post("/api/site")
    .set("Cookie", global.signinFirm())
    .send({
      title: "first-site-12",
    })
    .expect(201);

  sites = await Site.find({});
  expect(sites.length).toEqual(2);
  expect(sites[0].ownerId).toEqual("124324rewfds");
});

it("Publishes an event", async () => {
  const res = await request(app)
    .post("/api/site")
    .set("Cookie", global.signinFirm())
    .send({
      title: "first-site",
    })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
