import request from "supertest";
import app from "../../app";
it("testing for current user ", async () => {
  const cookie = await global.signin();
  console.log(cookie);
  const resp = await request(app)
    .get("/api/users/currentUser")
    .set("Cookie", cookie)
    .send()
    .expect(200);
  expect(resp.body.currentUser.email).toBe("abc@gmail.com");
});
it("responds with null if not authenticated", async () => {
  const response = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(200);

  expect(response.body.currentUser).toEqual(null);
});
