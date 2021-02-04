import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  BadRequestError,
  requireAuth,
  requireSitePermission,
  validateRequest,
} from "@thesaas/common-rfp";
import { Site } from "../models/site";
import { SiteCreatedPublisher } from "../events/publishers/site-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.post(
  "/api/site",
  requireAuth,
  [
    body("title")
      .notEmpty()
      .matches(/^[a-zA-Z0-9-]+$/)
      .withMessage(
        "A unique title must be provided. No spaces are allowed. Only alphanumeric characters and '-'"
      ),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    let { title } = req.body;

    title = title.toLowerCase();

    const existingSite = await Site.findOne({ title });

    if (existingSite) {
      throw new BadRequestError("The title must be unique.");
    }

    // const site = Site.build({
    //   title,

    //   ownerId: req.currentUser!.id,
    // });

    // await site.save();

    // await new SiteCreatedPublisher(natsWrapper.client).publish({
    //   id: site.id!, // bug with site doc? pin mongoose version.
    //   title: site.title,
    //   ownerId: site.ownerId,
    //   version: site.version,
    // });

    res.status(201).send("deprecated");
  }
);

export { router as createSiteRouter };
