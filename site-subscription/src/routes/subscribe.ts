import express, { Request, Response } from "express";
import {
  requireAuth,
  validateRequest,
  NotFoundError,
  NotAuthorizedError,
  BadRequestError,
  currentUser,
} from "@thesaas/common-rfp";
import { body } from "express-validator";
import { Package } from "../models/package";
import { natsWrapper } from "../nats-wrapper";
import { User } from "../models/user";
import { SitePurchasedPublisher } from "../events/publishers/site-purchased-publisher";
import {
  attachPaymentMethod,
  createCustomer,
  createSubscription,
  setPaymentMethodAsDefault,
  setSubscriptionDefaultPaymentMethod,
} from "../stripe";

const router = express.Router();

router.post(
  "/api/site-subscription/subscribe",
  requireAuth,
  [
    body("packageId").not().isEmpty().withMessage("packageId must be provided"),
    body("paymentMethod")
      .not()
      .isEmpty()
      .withMessage("paymentMethod must be provided"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { packageId, paymentMethod } = req.body;
    // Find the package the user is trying to subscribe to in the database
    const subscriptionPackage = await Package.findOne({ _id: packageId });

    if (!subscriptionPackage) {
      throw new NotFoundError();
    }

    const { priceId, freeTrial } = subscriptionPackage;

    if (req.currentUser!.userOfSite !== subscriptionPackage.site) {
      throw new NotAuthorizedError();
    }

    const user = await User.findOne({ _id: req.currentUser!.id });

    if (!user) {
      throw new BadRequestError("current user does not exist");
    }

    let subscription;
    let customer;

    try {
      if (!user.stripeDetails?.customer) {
        customer = await createCustomer(req.currentUser!.email);
        await attachPaymentMethod(paymentMethod.id, customer.id);

        customer = await setPaymentMethodAsDefault(
          customer.id,
          paymentMethod.id
        );

        user.stripeDetails = { customer };

        await user.save();
      } else {
        customer = user.stripeDetails.customer;
      }

      // ONLY ATTACH PAYMENT METHOD IF THE ONE THEY PUT UP THERE ISNT

      await attachPaymentMethod(paymentMethod.id, customer.id);

      //

      subscription = await createSubscription(customer.id, freeTrial, priceId);
      //
      await setSubscriptionDefaultPaymentMethod(
        subscription.id,
        paymentMethod.id
      );

      // issue ^^

      if (user.stripeDetails?.currentSubscriptions) {
        user.stripeDetails.currentSubscriptions.push(subscription);
        await user.save();
      } else {
        user.stripeDetails.currentSubscriptions = [subscription];
        await user.save();
      }
    } catch (error) {
      throw new BadRequestError("Stripe error");
    }

    new SitePurchasedPublisher(natsWrapper.client).publish({
      ownerId: user.id,
      subscriptionId: subscription.id,
    });

    res.status(200).send({ subscription });
  }
);

export { router as subscribeRouter };
