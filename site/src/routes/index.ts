import express, { Request, Response } from "express";
import { NotFoundError, requireAuth } from "@thesaas/common-rfp";
import { Site } from "../models/site";

const router = express.Router();

router.get("/api/site", requireAuth, async (req: Request, res: Response) => {
  const ownerId = req.currentUser!.id;

  console.log("finding sites...");

  const sites = await Site.find({ ownerId });

  res.status(200).send({ userSites: sites });
});

export { router as indexSiteRouter };
