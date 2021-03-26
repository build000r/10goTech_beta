import express, { Request, Response } from "express";
import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from "@thesaas/common-rfp";
import { body } from "express-validator";
import { Doc } from "../../models/doc";

const router = express.Router();

router.post(
  "/api/legal/signature/new",
  requireAuth,
  [body("userId").notEmpty().withMessage("userId must be provided")],
  validateRequest,
  async (req: Request, res: Response) => {
    const { userId, docId } = req.body;

    if (userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    const doc = await Doc.findOne().sort({ date: -1 }).limit(1);

    if (!doc) {
      throw new NotFoundError();
    }

    doc.userIds?.push(userId);
    doc.save();

    res.status(200).send({ userId });
  }
);

export { router as newSignatureRouter };
