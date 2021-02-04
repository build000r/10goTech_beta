import request from "supertest";
import { app } from "../../app";

it("sets a cookie after successful activation", async () => {
  const { userId, cookie } = await global.signin();

  // this behavior may not be wanted in the case of boat-charters site. For example, an administrator may wanto approve the users that sign up for their system. In that case, we should't reset the cookie fo the admin.

  const res = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(res.body.currentUser.id).toEqual(userId);
});

it("responds with null if not authenticated", async () => {
  const res = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(200);

  expect(res.body.currentUser).toEqual(null);
});
