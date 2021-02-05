import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from "@thesaas/common-rfp";
import express, { Request, Response } from "express";
import { Order } from "../models/order";

const router = express.Router();

router.get(
  "/api/order/:orderId",
  requireAuth,
  async (req: Request, res: Response) => {
    const order = await Order.findOne({ _id: req.params.orderId });

    if (!order) {
      throw new NotFoundError();
    }

    if (req.currentUser!.id !== order.products[0].siteOwnerId || order.userId) {
      throw new NotAuthorizedError();
    }

    res.status(200).send(order);
  }
);

export { router as showOrderRouter };
