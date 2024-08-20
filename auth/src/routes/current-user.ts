import express from "express";
import { currentUser } from "@gb65/commons";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, (req, res) => {
  console.log("Receiving request in currentUser....");
  res.status(200).send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
