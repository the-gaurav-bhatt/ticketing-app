import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongo: MongoMemoryServer;

// Define a type for the global namespace
declare global {
  var signin: () => string;
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
global.signin = (): string => {
  const payload = {
    id: "6602921adf1a40d2fc318f0b",
    email: "bhattgaurav654@gmail.com",
  };

  const token = jwt.sign(payload, process.env.JWT_KEY!);
  const session = { jwt: token };
  const sessionJSON = JSON.stringify(session);
  const base64 = Buffer.from(sessionJSON).toString("base64");
  return `session=${base64}`;
};
