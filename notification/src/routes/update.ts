// put -> update one of two things: 1) sendgrid info 2) one of the base emails.
// show the email

import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from "@thesaas/common-rfp";
import { Email } from "../models/email";

const router = express.Router();

router.put(
  "/api/notification/email-by-product/:ownerId/:productId",
  requireAuth,
  [
    body("subject")
      .notEmpty()
      .withMessage("The email subject must be provided."),
    body("body").notEmpty().withMessage("The email body must be provided."),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const email = await Email.findOne({ productId: req.params.productId });

    if (!email) {
      console.log("wher da email");
      throw new NotFoundError();
    }

    if (req.params.ownerId !== req.currentUser!.id) {
      console.log("aiuthed email owner check");
      throw new NotAuthorizedError();
    }

    email.set({
      subject: req.body.subject,
      body: req.body.body,
    });

    await email.save();

    res.send(email);
  }
);

export { router as updateEmailRouter };
