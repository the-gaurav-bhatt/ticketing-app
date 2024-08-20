import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError, BadRequestError } from "@gb65/commons";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
// boiler plate code for simple showing simple current user
const express = require("express");
const signupRouter = express.Router();

signupRouter.post(
  "/api/users/signup",
  body("email").isEmail().withMessage("Email must be Valid"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  async (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return next(new RequestValidationError(error.array()));
    }
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return next(new BadRequestError("Email already in use..."));
    }

    const user = User.build({ email, password });
    await user.save();
    // jwt implementation
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!,
      {
        algorithm: "HS256",
      }
    );
    req.session = {
      jwt: userJwt,
    };
    res.status(201).send(user);
  }
);
export default signupRouter;
