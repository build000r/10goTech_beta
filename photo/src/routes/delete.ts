import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from "@thesaas/common-rfp";
import express, { Request, Response } from "express";
import { ProductImage } from "../models/image";

const router = express.Router();

router.delete(
  "/api/photos/:photoId",
  requireAuth,
  async (req: Request, res: Response) => {
    const { photoId } = req.params;

    const image =
      (await ProductImage.findOne({ id: photoId })) ||
      (await ProductImage.findOne({ _id: photoId }));

    console.log(photoId);
    console.log(image);

    if (!image) {
      throw new NotFoundError();
    }

    await image.deleteOne();

    res.status(204).send({});
  }
);

export { router as deletePhotoRouter };
