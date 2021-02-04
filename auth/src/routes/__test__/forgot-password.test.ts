import request from "supertest";
import { app } from "../../app";
import { createGod } from "../../test/god";

it("Creates a reset password link", async () => {
  await createGod();
  await global.signin();

  const user = await request(app)
    .put("/api/users/forgotpassword/rfp")
    .send({
      email: "test@test.com",
    })
    .expect(200);

  expect(user.body.resetPasswordLink).toBeDefined();
});
