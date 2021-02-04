import request from "supertest";
import { app } from "../../app";
import { createGod } from "../../test/god";

it("sets a cookie after successful activation", async () => {
  await createGod();

  // this behavior may not be wanted in the case of boat-charters site...

  const user = await request(app).post("/api/users/signup/rfp").send({
    email: "test@test.com",
    password: "password",
    name: "name",
    phone: "4846782211",
  });

  const res = await request(app).post(`/api/users/activate/${user.body.token}`);

  expect(res.get("Set-Cookie")).toBeDefined();
});

it("Won't re-activate an existing user", async () => {
  await createGod();

  const user = await request(app).post("/api/users/signup/rfp").send({
    email: "test@test.com",
    password: "password",
    name: "name",
    phone: "4846782211",
  });

  await request(app).post(`/api/users/activate/${user.body.token}`).expect(201);
  await request(app).post(`/api/users/activate/${user.body.token}`).expect(400);
});

it("Allows for unique user and site combos", async () => {
  await createGod();

  const user = await request(app)
    .post("/api/users/signup/otherSite")
    .send({
      email: "subuser@test.com",
      password: "password",
      name: "name",
      phone: "4846782211",
    })
    .expect(200);

  await request(app).post(`/api/users/activate/${user.body.token}`).expect(201);

  const userWithSameEmail = await request(app)
    .post("/api/users/signup/otherSite2")
    .send({
      email: "subuser@test.com",
      password: "password",
      name: "name",
      phone: "4846782211",
    })
    .expect(200);

  await request(app)
    .post(`/api/users/activate/${userWithSameEmail.body.token}`)
    .expect(201);

  await request(app)
    .post("/api/users/signup/otherSite2")
    .send({
      email: "subuser@test.com",
      password: "password",
      name: "name",
      phone: "4846782211",
    })
    .expect(400);
});
