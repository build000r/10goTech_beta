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
  "/api/site-subscription/:site/:title",
  async (req: Request, res: Response) => {
    if (!req.params.site || !req.params.title) {
      throw new BadRequestError("Must pass a site");
    }

    const { site, title } = req.params;

    const showOnePackage = await Package.findOne({
      site,
      title,
    });

    res.status(200).send({ onePackage: showOnePackage });
  }
);

export { router as showPackageRouter };
