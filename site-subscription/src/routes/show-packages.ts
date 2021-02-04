// show the available packages for purchase for a given "god" site

import mongoose from "mongoose";
import express, { Request, Response } from "express";
import {
  validateRequest,
  NotFoundError,
  BadRequestError,
} from "@thesaas/common-rfp";
import { body } from "express-validator";
import { Package } from "../models/package";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.get(
  "/api/site-subscription/:site",
  async (req: Request, res: Response) => {
    if (!req.params.site) {
      throw new BadRequestError("Must pass a site");
    }

    const { site } = req.params;

    const subscriptionPackages = await Package.find({ site });
    if (!subscriptionPackages) {
      throw new NotFoundError();
    }

    res.status(201).send({ packages: subscriptionPackages });
  }
);

export { router as showPackagesRouter };
