import { Request, Response } from "express";
import { currentUserRouter } from "./routes/current-user";
import { signoutRouter } from "./routes/signout";
import { signinRouter } from "./routes/signin";
import signupRouter from "./routes/signup";
import { errorHandler } from "./middlewares/error-middleware";
import cookieSessi from "cookie-session";

import express from "express";
const app = express();
app.set("trust proxy", true); // trust first proxy in cluster
app.use(express.json());
app.use(
  cookieSessi({
    signed: false,
    secure: process.env.NODE_ENV == "production",
  })
);
app.use(currentUserRouter);
app.use(signoutRouter);
app.use(signinRouter);
app.use(signupRouter);
app.get("/api/users/:userName", (req: Request, res: Response) => {
  const userName = req.params.userName;
  console.log("Finally It is working....");
  res.send({ message: `Hello, ${userName}` });
});
app.use(errorHandler);

export default app;
