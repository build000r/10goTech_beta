import { NotFoundError } from "@thesaas/common-rfp";
import express, { Request, Response } from "express";
import { Product } from "../models/product";
import { Site } from "../models/site";

const router = express.Router();

router.get(
  "/api/product/:siteTitle/:slug",
  async (req: Request, res: Response) => {
    const { siteTitle, slug } = req.params;
    const site = await Site.findOne({ title: siteTitle });

    const product = await Product.find({ slug }).populate("site");

    if (!product || !site) {
      throw new NotFoundError();
    }

    // may be multiple sites with the same product name.
    // there is only one product that belongs to one site

    const productOfSite = product.filter(
      (p: any) => p.site!.title === siteTitle
    )[0];

    if (!productOfSite) {
      throw new NotFoundError();
    }

    res.status(200).send(productOfSite);
  }
);

export { router as showProductRouter };
