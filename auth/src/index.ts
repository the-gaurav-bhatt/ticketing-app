import mongoose from "mongoose";
import app from "./app";
// this whole starting of the server seperately is done so that supertest can use the
// any port for  testing. If we don't do it,running test for multiple servers  will fail as they all try to listen on same
//  port
if (!process.env.JWT_KEY) {
  throw Error("JWT not provided");
}
const backendConnect = async () => {
  console.log(process.env.JWT_KEY);

  try {
    console.log("Connecting to database....");
    await mongoose.connect("mongodb://mongo-depl-srv:27017/auth");
    console.log("Connected to database.");
  } catch (err) {
    console.error(err);
  }
};

backendConnect();
app.listen(4000, () => {
  console.log("Listening on port 4000....");
});
