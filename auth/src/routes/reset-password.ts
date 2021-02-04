import express, { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError, validateRequest } from "@thesaas/common-rfp";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { Password } from "../services/password";

const router = express.Router();

router.put(
  "/api/users/resetpassword/:resetPasswordLink",
  [
    body("newPassword")
      .isLength({ min: 6, max: 20 })
      .withMessage("Password must be between 6 and 20 characters."),
  ],
  validateRequest,
  (req: Request, res: Response) => {
    const { newPassword } = req.body;
    const { resetPasswordLink } = req.params;

    if (!resetPasswordLink) {
      throw new BadRequestError("Reset password token required.");
    }

    jwt.verify(
      resetPasswordLink,
      process.env.JWT_KEY!,
      async (error, decoded) => {
        if (error) {
          throw new BadRequestError("Reset password link has expired");
        }

        let user = await User.findOne({
          resetPasswordLink,
        });

        if (user === null) {
          throw new BadRequestError(
            "Reset password link can only be used once."
          );
        }

        const updatedPassword = await Password.toHash(newPassword);

        await user.updateOne({
          password: updatedPassword,
          resetPasswordLink: "",
        });

        return res.send(user);
      }
    );
  }
);

export { router as resetPasswordRouter };
