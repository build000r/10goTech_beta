import express, { Request, Response } from "express";
import { body } from "express-validator";
import { NotFoundError, validateRequest } from "@thesaas/common-rfp";
import { Site } from "../models/site";

const router = express.Router();

router.get(
  "/api/site/:title",
  validateRequest,
  async (req: Request, res: Response) => {
    let { title } = req.params;

    // title = title.toLowerCase()

    const site = await Site.findOne({ title });

    if (!site) {
      throw new NotFoundError();
    }

    res.send(site);
  }
);

export { router as showSiteRouter };
