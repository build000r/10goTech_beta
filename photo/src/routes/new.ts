import express, { Request, Response } from "express";
import {
  BadRequestError,
  currentUser,
  NotAuthorizedError,
  NotFoundError,
  OrderCrmStatus,
  requireAuth,
  requireSitePermission,
  validateRequest,
} from "@thesaas/common-rfp";
import { ProductImage } from "../models/image";
import formidable from "formidable";
import fs from "fs";
import { body } from "express-validator";
import { promisify } from "util";
import multer from "multer";

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }

    cb(null, true);
  },
});

const router = express.Router();

router.post(
  "/api/photo",
  requireAuth,
  upload.single("photo"),
  async (req: Request, res: Response) => {
    const imageUpload = req.file.buffer;

    // current user id

    // const { ownerId, productId } = req.params;

    const { ownerId, productId, caption } = req.body;

    if (req.currentUser!.id !== ownerId) {
      console.log("not logged in fix this");
      throw new NotAuthorizedError();
    }

    const img = ProductImage.build({
      photo: imageUpload,
      productId: productId || "fdsafs",
      caption,
    });

    await img.save();

    res.status(201).send(img);
  }
);

export { router as newPhotoRouter };
