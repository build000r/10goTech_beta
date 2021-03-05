import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  requireSitePermission,
  validateRequest,
} from "@thesaas/common-rfp";
import { Site } from "../models/site";
import { SiteUpdatedPublisher } from "../events/publishers/site-updated-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.put(
  "/api/site/:oldTitle",
  requireAuth,
  [
    body("title")
      .notEmpty()
      .matches(/^[a-zA-Z0-9-]+$/)
      .withMessage(
        "A unique title must be provided. No spaces are allowed. Only alphanumeric characters and '-'"
      ),
    body("homeTitle")
      .notEmpty()
      .withMessage("The home title must be provided."),
    body("tagline").notEmpty().withMessage("The tagline must be provided."),
    body("aboutUsBlurb")
      .notEmpty()
      .withMessage("The about us blurb must be provided."),
    body("aboutUsTitle")
      .notEmpty()
      .withMessage("The about us title must be provided."),
    body("privacyPolicy")
      .notEmpty()
      .withMessage("The privacy policy  must be provided."),
    body("termsOfService")
      .notEmpty()
      .withMessage("The terms of service must be provided."),
    body("sendFromEmail")
      .notEmpty()
      .withMessage("The sendfrom email  must be provided."),
    body("sendgridApiKey")
      .notEmpty()
      .withMessage("The sendgrid api key must be provided."),
    body("servicesPageSubheadline")
      .notEmpty()
      .withMessage("The servicesPageSubheadline must be provided."),
    body("servicesPageHeadline")
      .notEmpty()
      .withMessage("The servicesPageHeadline  must be provided."),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    let {
      title,
      homeTitle,
      tagline,
      aboutUsTitle,
      aboutUsBlurb,
      privacyPolicy,
      termsOfService,
      sendFromEmail,
      sendgridApiKey,
      servicesPageSubheadline,
      servicesPageHeadline,
    } = req.body;

    const site = await Site.findOne({ title: req.params.oldTitle });

    if (!site) {
      throw new NotFoundError();
    }

    if (site.ownerId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    title = title.toLowerCase();

    site.set({
      title,
      homeTitle,
      tagline,
      aboutUsTitle,
      aboutUsBlurb,
      privacyPolicy,
      termsOfService,
      sendFromEmail,
      sendgridApiKey,
      servicesPageSubheadline,
      servicesPageHeadline,
    });

    await site.save();

    new SiteUpdatedPublisher(natsWrapper.client).publish({
      title: site.title,
      version: site.version,
      id: site.id,
      ownerId: site.ownerId,
    });

    res.status(200).send(site);
  }
);

export { router as updateSiteRouter };
