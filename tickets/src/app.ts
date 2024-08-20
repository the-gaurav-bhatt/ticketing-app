import { NotFoundError, currentUser, errorHandler } from "@gb65/commons";
import cookieSessi from "cookie-session";
import express from "express";
import { TicketRouter } from "./routes/new";
const app = express();
app.set("trust proxy", true); // trust first proxy in cluster
app.use(express.json());
app.use(
  cookieSessi({
    signed: false,
    secure: process.env.NODE_ENV == "production",
  })
);
app.use(currentUser);
app.use(TicketRouter);
app.all("*", () => {
  throw new NotFoundError();
});
app.use(errorHandler);

export default app;
