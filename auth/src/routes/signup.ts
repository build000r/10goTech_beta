import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest, BadRequestError } from "@thesaas/common-rfp";
import { sign } from "jsonwebtoken";
import { setApiKey, send } from "@sendgrid/mail";

import { User } from "../models/user";

import { Password } from "../services/password";
import { Site } from "../models/site";
import { UserSignupPublisher } from "../events/publishers/user-signup-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.post(
  "/api/users/signup/:userOfSite",
  [
    body("email").isEmail().withMessage("Must be a valid email address."),
    body("password")
      .isLength({ min: 6, max: 20 })
      .withMessage("Password must be between 6 and 20 characters."),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    interface newUser {
      name: string;
      email: string;
      password: string;
      phone: number;
    }

    let { name, email, password, phone }: newUser = req.body;

    const { userOfSite } = req.params;

    const existingSite = await Site.findOne({ title: userOfSite });

    if (!existingSite) {
      throw new BadRequestError(
        "The site for which you are signing up for no longer exists."
      );
    }

    const existingUser = await User.findOne({
      email,
      userOfSite,
    });

    if (existingUser) {
      throw new BadRequestError("Email is in use for this site.");
    }

    password = await Password.toHash(password);

    let createSitePermission: boolean;

    userOfSite === "rfp"
      ? (createSitePermission = true)
      : (createSitePermission = false);

    const token = sign(
      { name, email, userOfSite, password, phone, createSitePermission },
      process.env.JWT_KEY!,
      { expiresIn: "3d" }
    );

    new UserSignupPublisher(natsWrapper.client).publish({
      name,
      email,
      userOfSite,
      token,
    });

    return res.status(200).send({
      name,
      email,
      createSitePermission,
      userOfSite,
      password,
      phone,
      token,
    });

    // rules around tenant id - there can only be one super-user

    // change to env...
    //@ts-ignore
    const { sendgridApiKey, sendFromEmail } = existingSite;
    setApiKey(sendgridApiKey);

    // how do I find the client URL from the tenant?

    const CLIENT_URL = "rfp.com";

    const activateEmailModel = {
      tenant: "url",
      purpose: "accountActivation",
      from: "noreply@tenant.com",
      subject: "Account Activation Link",
      html: `<p>Please use the following link to activate your account</p>
      <p>${CLIENT_URL}/auth/activate/${token}</p>
      <hr />
      <p>this email may contain sensitive information</p>
      <p>${CLIENT_URL}</p>
      `,
    };

    //@ts-ignore
    const accountActivationEmail = await Email.find({
      userOfSite,
      purpose: "accountActivation",
    });

    const emailData = {
      from: activateEmailModel.from,
      to: email,
      subject: activateEmailModel.subject,
      html: activateEmailModel.html,
    };

    const sent = await send(emailData);
    // figure out error handling of emails.
    console.log(sent);

    return res.send("info has been emailed");

    // does user already exist for this tenant? each client sends in their tenant info (stored in .env)
    // encode their email in the JWT (not password..) and send them an activation link
  }
);

export { router as signupRouter };
