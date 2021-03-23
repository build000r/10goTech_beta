import { BadRequestError, NotFoundError } from "@thesaas/common-rfp";
import express, { Request, Response } from "express";
import { Product } from "../models/product";
import { Site } from "../models/site";

const router = express.Router();

router.get("/api/product/:siteTitle", async (req: Request, res: Response) => {
  try {
    const site = await Site.findOne({ title: req.params.siteTitle });

    if (!site) {
      throw new NotFoundError();
    }

    const products = await Product.find({ site });

    if (!products) {
      throw new NotFoundError();
    }

    res.status(200).send(products);
  } catch (error) {
    res.send({ error });
  }
});

export { router as indexProductRouter };
