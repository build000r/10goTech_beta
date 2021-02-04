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
import { User } from "../models/user";
import {
  getPaymentMethod,
  getSubscriptionById,
  getSubscriptionsByCustomerId,
} from "../stripe";

const router = express.Router();

router.get(
  "/api/site-subscriptions/subscription/:subscriptionId",
  requireAuth,
  async (req: Request, res: Response) => {
    const subscription = await getSubscriptionById(req.params.subscriptionId);

    const user = await User.findOne({
      "stripeDetails.customer.id": subscription.customer,
    });

    if (!user) {
      throw new BadRequestError("user not found");
    }

    // const pm =

    // if (subscription.default_payment_method !== typeof String) {
    //   console.log(subscription);
    //   console.log(subscription.default_payment_method);
    //   throw new BadRequestError("subscriptoun details not found");
    // }

    console.log("user from get subscription call");

    const paymentMethod = await getPaymentMethod(
      //@ts-ignore
      subscription.default_payment_method
    );

    res.status(200).send({ subscription, paymentMethod });
  }
);

export { router as showSubscriptionRouter };
