import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from "@thesaas/common-rfp";
import express, { Request, Response } from "express";
import { ProductImage } from "../models/image";

const router = express.Router();

router.get("/api/photos/:productId", async (req: Request, res: Response) => {
  try {
    const images = await ProductImage.find({ productId: req.params.productId });

    res.status(200).send(images);
  } catch (error) {
    res.send({ error });
  }
});

export { router as viewPhotosByProductRouter };
