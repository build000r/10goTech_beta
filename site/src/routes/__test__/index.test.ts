import request from "supertest";
import { app } from "../../app";

it("Shows a list of sites created by the authenticated user", async () => {
  await request(app)
    .post("/api/site")
    .set("Cookie", global.signinGod())
    .send({
      title: "site-one",
    })
    .expect(201);

  await request(app)
    .post("/api/site")
    .set("Cookie", global.signinFirm())
    .send({
      title: "site-two",
    })
    .expect(201);

  await request(app)
    .post("/api/site")
    .set("Cookie", global.signinFirm())
    .send({
      title: "site-three",
    })
    .expect(201);

  const res = await request(app)
    .get("/api/site")
    .set("Cookie", global.signinFirm())
    .expect(200);

  expect(res.body.length).toEqual(2);
});
