import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import app from ".././app";

let mongo: MongoMemoryServer;

// Define a type for the global namespace
declare global {
  var signin: () => Promise<string>;
}

beforeAll(async () => {
  process.env.JWT_KEY = "asdfghjkl";

  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();

  await mongoose.connect(uri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop(); // Stop the MongoDB memory server
  await mongoose.connection.close(); // Close the Mongoose connection
});

// Provide a type annotation for the global `signin` function
global.signin = async (): Promise<string> => {
  const authRes = await request(app)
    .post("/api/users/signup")
    .send({
      email: "abc@gmail.com",
      password: "asdfghjkl",
    })
    .expect(201);
  const cook = authRes.headers["set-cookie"][0];
  const cookie = cook.split(";")[0];
  return cookie;
};

// Your tests go here...
