import request from "supertest";
import app from "../../app";
it("testing for logging in ", async () => {
  //signup first
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "abc@gmail.com",
      password: "1234567890",
    })
    .expect(201);

  expect(response.body).toHaveProperty("email");
  expect(response.body).toHaveProperty("id");

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "abc@gmail.com",
      password: "1234567890",
    })
    .expect(200);
});
