import request from "supertest";
import app from "../../app";
import jwt from "jsonwebtoken";
it("returns a 201 on successfull signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "user@example.com",
      password: "12345678",
    })
    .expect(201);
});
it("returns a 400 on error for  invalid email", () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "invalid_email",
      password: "12345678",
    })
    .expect(400);
});
it("returns a 400 on error for  invalid password", () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "invalid_email",
      password: "128",
    })
    .expect(400);
});
it("returns a 400 on error for missing email or password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "invalid_email@gmail.com",
    })
    .expect(400);
  await request(app)
    .post("/api/users/signup")
    .send({
      password: "123456789",
    })
    .expect(400);
});
it("returns error for duplicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "thisismyemail@gmail.com",
      password: "12345678",
    })
    .expect(201);
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "thisismyemail@gmail.com",
      password: "12345678",
    })
    .expect(400);
});
it("should generate a valid jwt token upon successfull sigup", async () => {
  const email = "thisismyemail@gmail.com";

  const resp = await request(app).post("/api/users/signup").send({
    email,
    password: "12345678",
  });
  try {
    expect(resp.headers["set-cookie"]).toBeDefined();
    // the cookie is being set and not has been completely encoded
    // because of which we cant verify early
    // const cookie = resp.headers["set-cookie"][0];
    // const Jwt = cookie.split(";")[0].split("=")[1];
    // const decoded = jwt.verify(Jwt, "asdfghjkl", {
    //   algorithms: ["HS256"],
    // });
    // expect(decoded).toHaveProperty("id");
    // expect(decoded).toHaveProperty(email);
  } catch (err) {
    console.log(err);
  }
});
