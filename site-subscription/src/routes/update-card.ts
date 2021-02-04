// show a user what their current subscription is
// show the available packages for purchase for a given "god" site

import mongoose from "mongoose";
import express, { Request, Response } from "express";
import {
  requireAuth,
  NotFoundError,
  BadRequestError,
  NotAuthorizedError,
  validateRequest,
} from "@thesaas/common-rfp";
import { User } from "../models/user";
import {
  attachPaymentMethod,
  getSubscriptionById,
  getSubscriptionsByCustomerId,
  setSubscriptionDefaultPaymentMethod,
} from "../stripe";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/api/site-subscriptions/update-card/:subscriptionId",
  requireAuth,
  [
    body("newPaymentMethod")
      .not()
      .isEmpty()
      .withMessage("packageId must be provided"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { newPaymentMethod } = req.body;
    const { id } = newPaymentMethod;

    const subscription = await getSubscriptionById(req.params.subscriptionId);

    const user = await User.findOne({
      "stripeDetails.customer.id": subscription.customer,
    });

    if (!user) {
      throw new BadRequestError("user not found");
    }

    const { id: newPaymentMethodId } = await attachPaymentMethod(
      id,
      user.stripeDetails.customer.id
    );

    const newPayment = await setSubscriptionDefaultPaymentMethod(
      subscription.id,
      newPaymentMethodId
    );

    res.status(200).send({ newPayment });
  }
);

export { router as updateCardRouter };
