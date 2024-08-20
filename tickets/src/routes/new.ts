import express, { NextFunction, Request, Response } from "express";
import { requireAuth } from "@gb65/commons";
const newRouter = express.Router();

newRouter.post("/api/tickets", requireAuth, (req: Request, res: Response) => {
  res.sendStatus(200);
});
export { newRouter as TicketRouter };
