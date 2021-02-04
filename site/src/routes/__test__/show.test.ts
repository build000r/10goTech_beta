import request from "supertest";
import { app } from "../../app";

it("Returns a 404 if the site is not found", async () => {
  await request(app).get("/api/site/fdsafdsa").send().expect(404);
});

it("Returns the site if it is found", async () => {
  const response = await request(app)
    .post("/api/site")
    .set("Cookie", global.signinFirm())
    .send({
      title: "first-site",
    })
    .expect(201);

  const siteResponse = await request(app)
    .get(`/api/site/${response.body.title}`)
    .send()
    .expect(200);

  expect(siteResponse.body.ownerId).toEqual("124324rewfds");
});

it.todo("Account for showing user dashboards...");
