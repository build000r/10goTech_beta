import { requireAuth } from "@thesaas/common-rfp";
import express, { Request, Response } from "express";
import { Order } from "../models/order";

const router = express.Router();

router.delete(
  "/api/order/:orderId",
  requireAuth,
  async (req: Request, res: Response) => {
    console.log("todo delete order");
    res.send({});
  }
);

export { router as deleteOrderRouter };
