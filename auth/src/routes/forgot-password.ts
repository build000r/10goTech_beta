import express, { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError, validateRequest } from "@thesaas/common-rfp";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
const router = express.Router();

router.put(
  "/api/users/forgotpassword/:userOfSite",
  [body("email").isEmail().withMessage("Must be a valid email address.")],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email } = req.body;
    const { userOfSite } = req.params;

    const existingUser = await User.findOne({ email, userOfSite });

    if (!existingUser) {
      throw new BadRequestError("Authentication failed.");
    }

    const token = jwt.sign(
      { id: existingUser.id, name: existingUser.name },
      process.env.JWT_KEY!,
      {
        expiresIn: "30m",
      }
    );

    await existingUser.updateOne({
      resetPasswordLink: token,
    });

    const user = await User.findOne({ resetPasswordLink: token });

    return res.status(200).send(user);

    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Password Reset Link (expires in 30min)`,
      html: `<p>Please use the following link to reset your password</p>
          <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
          <hr />
          <p>this email may contain sensitive information</p>
          <p>${process.env.CLIENT_URL}</p>
    
          `,
    };

    // const sent = await sgMail.send(emailData);
    // console.log(sent);
    console.log(emailData);
    console.log(email);

    res.json({
      msg: `Email has been sent to ${email}. Follow the instruction to activate your account`,
    });

    //
  }
);

export { router as forgotPasswordRouter };
