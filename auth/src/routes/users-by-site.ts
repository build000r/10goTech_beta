import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { BadRequestError, validateRequest } from "@thesaas/common-rfp";
import { User } from "../models/user";
import { Password } from "../services/password";

const router = express.Router();

router.get(
  "/api/users/by-site/:userOfSite",

  async (req: Request, res: Response) => {
    const { userOfSite } = req.params;

    const users = await User.find({ userOfSite });

    res.status(200).send(users);
  }
);

export { router as userBySiteRouter };
