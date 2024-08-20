import request from "supertest";
import app from "../../app";
it("test for unspecified url", async () => {
  await request(app).get("/api/tickets").expect(404);
});
it("ticket creation can only be accessed if user is logged in ", async () => {
  await request(app).post("/api/tickets").send({}).expect(401);
});
it("returns a status other than 401 if the user is signed in", async () => {
  console.log(global.signin());
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({});
  expect(response.status).not.toEqual(401);
});
