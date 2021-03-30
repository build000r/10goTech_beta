// show the site

import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from "@thesaas/common-rfp";
import { Site } from "../models/site";

const router = express.Router();

router.get(
  "/api/notification/config/:title",
  requireAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    const site = await Site.findOne({ title: req.params.title });

    if (!site) {
      throw new NotFoundError();
    }

    if (site.owner.toString() !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    res.send(site);
  }
);

export { router as configShowRouter };
