import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { BadRequestError, validateRequest } from "@thesaas/common-rfp";
import { User } from "../models/user";
import { Password } from "../services/password";

const router = express.Router();

router.post(
  "/api/users/signin/:userOfSite",
  [
    body("email").isEmail().withMessage("Must be a valid email address."),
    body("password")
      .isLength({ min: 6, max: 20 })
      .withMessage("Password must be between 6 and 20 characters."),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { userOfSite } = req.params;

    const existingUser = await User.findOne({ email, userOfSite });

    if (!existingUser) {
      throw new BadRequestError("Authentication failed.");
    }

    const passwordCorrect = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordCorrect) {
      throw new BadRequestError("Authentication failed.");
    }

    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
        userOfSite: existingUser.userOfSite,
        createSitePermission: existingUser.createSitePermission,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
