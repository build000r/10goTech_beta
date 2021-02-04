import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
} from "@thesaas/common-rfp";
import express, { Request, Response } from "express";
import { Product } from "../models/product";
import { Site } from "../models/site";

const router = express.Router();

router.delete(
  "/api/product/:siteTitle/:productTitle",
  async (req: Request, res: Response) => {
    const { siteTitle, productTitle } = req.params;

    const site = await Site.findOne({ title: siteTitle });

    if (!site) {
      throw new NotFoundError();
    }

    if (site.ownerId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    const existingProduct = await Product.findOne({
      title: productTitle,
      site,
    });

    if (!existingProduct) {
      throw new NotFoundError();
    }

    await existingProduct.deleteOne();

    res.status(204).send({});
  }
);

export { router as deleteProductRouter };
