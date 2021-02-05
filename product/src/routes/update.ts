import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  requireSitePermission,
  validateRequest,
} from "@thesaas/common-rfp";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Product } from "../models/product";
import { Site } from "../models/site";

const router = express.Router();

router.put(
  "/api/product/:siteTitle/:productSlug",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("title must be defined"),
    body("description")
      .not()
      .isEmpty()
      .withMessage("description must be defined"),
    body("brief").not().isEmpty().withMessage("brief must be defined"),
    body("clickOptions")
      .not()
      .isEmpty()
      .withMessage("clickOptions must be defined"),
    body("customerNote")
      .not()
      .isEmpty()
      .withMessage("customerNote must be defined"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, description, brief, clickOptions, customerNote } = req.body;

    const { siteTitle, productSlug } = req.params;

    const slug = title.replace(/\s+/g, "-").toLowerCase();

    const site = await Site.findOne({ title: siteTitle });

    if (!site) {
      throw new NotFoundError();
    }

    if (site.ownerId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    const existingProduct = await Product.findOne({
      slug: productSlug,
    }).populate("site");

    if (!existingProduct || existingProduct.site!.title !== siteTitle) {
      throw new BadRequestError(
        "The product you are trying to update does not exist"
      );
    }

    const titleInUse = await Product.findOne({ site, title });

    if (titleInUse && titleInUse.id !== existingProduct.id) {
      console.log("still a PROBLEMO");
      throw new BadRequestError("The new title must be unique to this site");
    }

    existingProduct.title = title;
    existingProduct.description = description;
    existingProduct.brief = brief;
    existingProduct.clickOptions = clickOptions;
    existingProduct.slug = slug;
    existingProduct.customerNote = customerNote;

    // check out the updated publisher if needed

    await existingProduct.save();

    res.status(200).send(existingProduct);
  }
);

export { router as updateProductRouter };
