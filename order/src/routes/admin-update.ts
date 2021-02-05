import express, { Request, Response } from "express";
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  requireSitePermission,
  validateRequest,
} from "@thesaas/common-rfp";
import { body } from "express-validator";
import { Order } from "../models/order";

const router = express.Router();

router.put(
  "/api/order",
  requireAuth,
  [
    body("orderId").notEmpty().withMessage("orderId must be provided"),
    body("crmStatus").notEmpty().withMessage("crmStatus must be provided"),
    body("ownerNote").notEmpty().withMessage("ownerNote must be provided"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    // make sure authed user is owner is owner of the product/site
    const { orderId, crmStatus, ownerNote } = req.body;

    const order =
      (await Order.findOne({ id: orderId })) ||
      (await Order.findOne({ _id: orderId }));

    if (!order) {
      throw new NotFoundError();
    }

    const isOwner = order.products[0].site.ownerId === req.currentUser!.id;

    if (!isOwner) {
      throw new NotAuthorizedError();
    }

    order.crmStatus = crmStatus;
    order.ownerNote = ownerNote;

    // order status update publisher ==> notifs svc ?

    await order.save();

    res.send(order);
  }
);

export { router as adminUpdateRouter };
