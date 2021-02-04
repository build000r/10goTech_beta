import express, { Request, Response } from "express";
import { validateRequest, BadRequestError } from "@thesaas/common-rfp";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { Site } from "../models/site";
import { UserActivatedPublisher } from "../events/publishers/user-activated-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.post(
  "/api/users/activate/:token",
  validateRequest,
  async (req: Request, res: Response) => {
    const token = req.params.token;

    const {
      name,
      email,
      password,
      phone,
      userOfSite,
      createSitePermission,
    } = jwt.decode(token) as {
      name: string;
      email: string;
      userOfSite: string;
      createSitePermission: boolean;
      password: string;
      phone: number;
    };

    if (!email || !password || !userOfSite) {
      throw new BadRequestError("Link has expired.");
    }

    // REFACTOR for event bus implementatino and separate microservice for site
    const existingUser = (await User.find({ email, userOfSite })).length > 0;

    if (existingUser) {
      throw new BadRequestError("Email is already in use.");
    }

    const existingSite = await Site.findOne({ title: userOfSite });

    if (!existingSite) {
      throw new BadRequestError(
        "The site for which you are signing up for no longer exists."
      );
    }

    const user = User.build({
      name,
      email,
      password,
      phone,
      userOfSite,
      createSitePermission,
    });

    await user.save();

    const id: string = user.id;

    new UserActivatedPublisher(natsWrapper.client).publish({
      userOfSite: user.userOfSite || userOfSite,
      name: user.name ? user.name : "",
      email: user.email,
      id,
      createSitePermission: user.createSitePermission ? true : false,
      version: user.version,
    });

    existingSite.userEmails.push(user.email);

    await existingSite.save();

    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
        userOfSite: user.userOfSite,
      },
      process.env.JWT_KEY!,
      { expiresIn: "7d" }
    );

    req.session = { jwt: userJwt };

    res.status(201).send(user);
  }
);

export { router as accountActivationRouter };
