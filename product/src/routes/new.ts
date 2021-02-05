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
import { Site } from "../models/site";
import { Product } from "../models/product";
import { ProductCreatedPublisher } from "../events/publishers/product-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.post(
  "/api/product/:siteTitle",
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
    console.log("IM IN THE NEW ROUTE");
    const { title, description, brief, clickOptions, customerNote } = req.body;

    const { siteTitle } = req.params;

    const site = await Site.findOne({ title: siteTitle });

    console.log(title, siteTitle);

    const slug = title.replace(/\s+/g, "-").toLowerCase();

    console.log("slug", slug);

    if (!site) {
      console.log("cantfind site");
      throw new NotFoundError();
    }

    if (site.ownerId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    const existingProduct = await Product.findOne({ title, site });

    if (existingProduct) {
      throw new BadRequestError(
        "A product with this title already exists for this site"
      );
    }

    const product = Product.build({
      site,
      title,
      description,
      brief,
      clickOptions,
      slug,
      customerNote,
    });

    await product.save();

    new ProductCreatedPublisher(natsWrapper.client).publish({
      id: product.id,
      ownerId: req.currentUser!.id,
      title: product.title,
      siteId: site.id,
      siteTitle: site.title,
      version: product.version,
    });

    res.status(201).send(product);
  }
);

export { router as createProductRouter };
