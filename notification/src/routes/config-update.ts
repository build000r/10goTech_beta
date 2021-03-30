// put -> update one of two things: 1) sendgrid info 2) one of the base emails.
// show the email

import express, { request, Request, Response } from "express";
import { body } from "express-validator";
import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from "@thesaas/common-rfp";
import { Email } from "../models/email";
import { Site } from "../models/site";
import axios from "axios";
import mailjet from "node-mailjet";

const router = express.Router();

router.put(
  "/api/notification/config",
  requireAuth,
  [
    body("title").notEmpty().withMessage("The title must be provided."),
    body("mailjetFromEmail")
      .notEmpty()
      .isEmail()
      .withMessage("A valid email address must be provided."),
    body("mailjetFromName")
      .notEmpty()
      .withMessage("The email mailjetFromName must be provided."),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, mailjetFromEmail, mailjetFromName } = req.body;

    const site = await Site.findOne({ title });

    if (!site) {
      throw new NotFoundError();
    }

    if (site.owner.toString() !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    // update verified senders

    try {
      const mj = mailjet.connect(site.mailjetPublic, site.mailjetPrivate);
      let senderExists = false;

      const getSenders = async () => {
        const senders = await mj.get("sender", { version: "v3" }).request();
        const senderEmailArray = senders.body.Data.map((s: any) => s.Email);
        const senderDomain = "*@" + mailjetFromEmail.split("@")[1];
        senderExists =
          senderEmailArray.includes(mailjetFromEmail) ||
          senderEmailArray.includes(senderDomain);
      };

      await getSenders();

      // if (!senderExists) {
      // add as a verified sender, with the name
      //   const postSender = await mj.post("sender", { version: "v3" }).request({
      //     EmailType: "transactional",
      //     IsDefaultSender: "false",
      //     Name: mailjetFromName,
      //     Email: mailjetFromEmail,
      //   });
      // }
      //
      // if (senderExists) {
      //   const sender = await mj
      //     .get("sender", { version: "v3" })
      //     .id(mailjetFromEmail)
      //     .request();
      //   console.log(sender.body.Data[0]);
      //   //@ts-ignore
      //   sender.body.Data[0]?.Name === mailjetFromName
      // }
    } catch (error) {
      console.log("error");
    }

    site.set({
      mailjetFromEmail,
      mailjetFromName,
    });

    await site.save();

    res.send(site);
  }
);

export { router as configUpdateRouter };
