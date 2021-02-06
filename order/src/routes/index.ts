import { requireAuth } from "@thesaas/common-rfp";
import express, { Request, Response } from "express";
import { Order, OrderDoc } from "../models/order";

const router = express.Router();

router.get(
  "/api/orders/:siteTitle",
  requireAuth,
  async (req: Request, res: Response) => {
    let orders;

    if (req.currentUser?.userOfSite === "rfp") {
      orders = await Order.find();

      if (orders) {
        orders = orders.filter(
          (order: OrderDoc) =>
            order.products[0].site.title === req.params.siteTitle
        );
      }
    } else {
      orders = await Order.find({ userId: req.currentUser!.id });
    }

    res.send(orders);
  }
);

export { router as indexOrderRouter };
