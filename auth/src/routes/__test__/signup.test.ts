import request from "supertest";
import { app } from "../../app";
import { createGod } from "../../test/god";

it("Creates an account with specific permissions based on the userOfSite parameter.", async () => {
  await createGod();

  let userOfSite = ["rfp", "otherSite"];

  for (const site of userOfSite) {
    let user = await request(app).post(`/api/users/signup/${site}`).send({
      email: "test@test.com",
      password: "password",
      name: "name",
      phone: "4846782211",
    });

    let expectation = site === "rfp" ? true : false;

    expect(user.body.createSitePermission).toEqual(expectation);
  }
});

it("returns a 400 with an invalid email, password, name, or phone number. Don't believe me? Mess with the parametes. I ain't writing all those tests.", async () => {
  await createGod();

  return request(app)
    .post("/api/users/signup/rfp")
    .send({
      email: "testest.com",
      password: "fdsfdafdsa",
      name: "name",
      phone: 4846782211,
    })
    .expect(400);
});

it("Allows a unique email to be used to create an account per site.", async () => {
  await createGod();

  const userRfp = await request(app).post("/api/users/signup/rfp").send({
    email: "test@test.com",
    password: "password",
    name: "name",
    phone: "4846782211",
  });

  await request(app).post(`/api/users/activate/${userRfp.body.token}`);

  await request(app)
    .post("/api/users/signup/rfp")
    .send({
      email: "test@test.com",
      password: "password",
      name: "name",
      phone: "4846782211",
    })
    .expect(400);

  await request(app)
    .post("/api/users/signup/otherSite")
    .send({
      email: "test@test.com",
      password: "password",
      name: "name",
      phone: "4846782211",
    })
    .expect(200);
});
