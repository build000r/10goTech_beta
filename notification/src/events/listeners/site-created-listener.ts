import { Message } from "node-nats-streaming";
import {
  BadRequestError,
  Listener,
  Subjects,
  SiteCreatedEvent,
} from "@thesaas/common-rfp";
import { Site } from "../../models/site";
import { User } from "../../models/user";
import { siteCreated } from "../../services/email-site-created";

import { queueGroupName } from "./queue-group-name";
import { Email } from "../../models/email";
import mongoose from "mongoose";

export class SiteCreatedListener extends Listener<SiteCreatedEvent> {
  readonly subject = Subjects.SiteCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: SiteCreatedEvent["data"], msg: Message) {
    // need to solve concurrency issues
    const siteExists = await Site.findOne({ title: data.title });

    if (siteExists) {
      msg.ack();
      return;
    }

    // //

    // // create & save site

    if (data.title === "rfp") {
      const owner = User.build({
        email: "robbaratta1@gmail.com",
        id: mongoose.Types.ObjectId().toHexString(),
        userOfSite: "rfp-god",
      });

      await owner.save();

      const site = Site.build({
        id: data.id,
        owner,
        title: data.title,
      });

      await site.save();

      return msg.ack();
    }

    const ownerRef =
      (await User.findOne({ _id: data.ownerId })) ||
      (await User.findOne({ id: data.ownerId }));
    // }

    if (!ownerRef) {
      throw new BadRequestError("Owner of site not found");
    }

    const site = Site.build({
      id: data.id,
      owner: ownerRef!,
      title: data.title,
    });

    await site.save();

    // send email confirmation & next steps to creator that the site has successfully been created.

    if (site.owner) {
      await siteCreated(ownerRef.email, site.title, site);
    }

    console.log(`${site.title} site created`);

    // create base set of email notifications for the site
    const userSignupEmail = Email.build({
      onEvent: Subjects.UserSignup,
      subject: "Thanks for signing up!",
      body: "danka shane",
      site,
    });

    await userSignupEmail.save();

    const userActivatedEmail = Email.build({
      onEvent: Subjects.UserActivated,
      subject: "Thanks for activating!",
      body: "thanks",
      site,
    });

    await userActivatedEmail.save();

    const orderCreatedEmail = Email.build({
      onEvent: Subjects.OrderCreated,
      subject: "Thanks for the order!",
      body: "thanks",
      site,
    });

    await orderCreatedEmail.save();
    //

    msg.ack();
  }
}
