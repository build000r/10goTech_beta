import request from "supertest";
import { app } from "../../app";
import { Site } from "../../models/site";

it("Returns a 404 if the site does not exist", async () => {
  await request(app)
    .put("/api/site/fdjskla")
    .set("Cookie", global.signinFirm())
    .send({
      title: "new-title",
    })
    .expect(404);
});

it("Returns a 401 if the user is not authenticated", async () => {
  await request(app)
    .put("/api/site/fdjskla")
    .send({
      title: "new-title",
    })
    .expect(401);
});

it("Returns a 401 if the user does not own the site", async () => {
  const res = await request(app)
    .post("/api/site")
    .set("Cookie", global.signinGod())
    .send({ title: "rfp" })
    .expect(201);

  await request(app)
    .put(`/api/site/${res.body.title}`)
    .set("Cookie", global.signinFirm())
    .send({
      title: "new-title",
    })
    .expect(401);

  expect(res.body.title).toEqual("rfp");
});

it("Returns a 400 if the user provides invalid parameters", async () => {
  // todo - add more parameters

  const res = await request(app)
    .post("/api/site")
    .set("Cookie", global.signinGod())
    .send({ title: "rfp" })
    .expect(201);

  await request(app)
    .put(`/api/site/${res.body.title}`)
    .set("Cookie", global.signinGod())
    .send({
      title: "",
    })
    .expect(400);

  expect(res.body.title).toEqual("rfp");
});

it("Updates the site", async () => {
  const res = await request(app)
    .post("/api/site")
    .set("Cookie", global.signinGod())
    .send({ title: "rfp" })
    .expect(201);

  const resUpdate = await request(app)
    .put(`/api/site/${res.body.title}`)
    .set("Cookie", global.signinGod())
    .send({
      title: "new-title",
    })
    .expect(200);

  expect(resUpdate.body.title).toEqual("new-title");
});

it.todo("Allows the upload of images for the leaderboard ");
it.todo("Dissallows the change of the Title as that is used in the URL.");
