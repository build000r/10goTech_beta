// show the email

import express, { Request, Response } from "express";
import { body } from "express-validator";
import { NotFoundError, validateRequest } from "@thesaas/common-rfp";
import { Email } from "../models/email";

const router = express.Router();

router.get(
  "/api/notification/email-by-product/:productId",
  validateRequest,
  async (req: Request, res: Response) => {
    const email = await Email.findOne({ productId: req.params.productId });

    if (!email) {
      throw new NotFoundError();
    }

    res.send(email);
  }
);

export { router as showBySubscriptionRouter };
