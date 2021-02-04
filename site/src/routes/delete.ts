import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  SiteDeletedEvent,
} from "@thesaas/common-rfp";
import express, { Request, Response } from "express";
import { SiteDeletedPublisher } from "../events/publishers/site-deleted-publisher";
import { Site } from "../models/site";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.delete(
  "/api/site/:siteTitle",
  requireAuth,
  async (req: Request, res: Response) => {
    const { siteTitle } = req.params;

    const site = await Site.findOne({
      title: siteTitle,
      ownerId: req.currentUser!.id,
    });

    if (!site) {
      throw new NotFoundError();
    }

    new SiteDeletedPublisher(natsWrapper.client).publish({
      subscriptionId: site.subscriptionId,
    });

    await site.deleteOne();

    res.status(204).send({ site });
  }
);

export { router as deleteSiteRouter };
