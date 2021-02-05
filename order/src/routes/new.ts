import express, { Request, Response } from "express";
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  OrderCrmStatus,
  requireAuth,
  requireSitePermission,
  validateRequest,
} from "@thesaas/common-rfp";
import { body } from "express-validator";
import { OrderCreatedPublisher } from "../events/publishers/order-created-publisher";
import { natsWrapper } from "../nats-wrapper";
import { Product } from "../models/product";
import { Order } from "../models/order";

const router = express.Router();

router.post(
  "/api/order",
  requireAuth,
  [body("products").notEmpty().withMessage("products must be provided")],
  validateRequest,
  async (req: Request, res: Response) => {
    const { products } = req.body;

    console.log("placing order!", products);

    if (req.currentUser!.userOfSite !== products[0].site.title) {
      throw new NotAuthorizedError();
    }

    const order = Order.build({
      userId: req.currentUser!.id,
      products,
      crmStatus: OrderCrmStatus.Created,
    });

    await order.save();

    new OrderCreatedPublisher(natsWrapper.client).publish({
      siteTitle: order.products[0].siteTitle,
      userId: order.userId,
      products: order.products,
      version: order.version,
    });

    res.status(201).send(order);
  }
);

export { router as newOrderRouter };
