// show a user what their current subscription is
// show the available packages for purchase for a given "god" site

import mongoose from "mongoose";
import express, { Request, Response } from "express";
import {
  requireAuth,
  NotFoundError,
  BadRequestError,
  NotAuthorizedError,
} from "@thesaas/common-rfp";
import { body } from "express-validator";
import { Package } from "../models/package";
import { natsWrapper } from "../nats-wrapper";
import { User } from "../models/user";
import { getSubscriptionById, getSubscriptionsByCustomerId } from "../stripe";

const router = express.Router();

router.get(
  "/api/site-subscriptions",
  requireAuth,
  async (req: Request, res: Response) => {
    const user =
      (await User.findOne({ _id: req.currentUser!.id })) ||
      (await User.findOne({ id: req.currentUser!.id }));

    if (!user) {
      throw new BadRequestError("uh oh");
    }

    const subscriptions = await getSubscriptionsByCustomerId(
      user.stripeDetails.customer.id
    );

    console.log("subscription", subscriptions);
    res.status(200).send({ subscriptions });
  }
);

export { router as showSubscriptionsRouter };
