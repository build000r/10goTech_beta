import request from "supertest";
import { app } from "../../app";
import { User } from "../../models/user";
import { createGod } from "../../test/god";
import { Password } from "../../services/password";

it("Creates a reset password link that works", async () => {
  await createGod();
  await global.signin();

  const res = await request(app)
    .put("/api/users/forgotpassword/rfp")
    .send({
      email: "test@test.com",
    })
    .expect(200);

  expect(res.body.resetPasswordLink).toBeDefined();

  await request(app)
    .put(`/api/users/resetpassword/${res.body.resetPasswordLink}`)
    .send({
      newPassword: "newnew123",
    })
    .expect(200);

  const newLogin = await request(app)
    .post("/api/users/signin/rfp")
    .send({ email: "test@test.com", password: "newnew123" })
    .expect(200);

  expect(newLogin.body.resetPasswordLink).toEqual("");
});
