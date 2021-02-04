import { Message } from "node-nats-streaming";
import {
  BadRequestError,
  Listener,
  Subjects,
  SiteCreatedEvent,
} from "@thesaas/common-rfp";
import { Site } from "../../models/site";
import { User } from "../../models/user";
import { siteCreated } from "../../services/email";

import { queueGroupName } from "./queue-group-name";
import { Email } from "../../models/email";

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

    //

    // create & save site
    let ownerRef;
    if (data.title !== "rfp") {
      ownerRef = await User.findOne({ _id: data.ownerId });

      if (!ownerRef) {
        throw new BadRequestError("Owner of site not found");
      }
    }

    const site = Site.build({
      id: data.id,
      owner: ownerRef || undefined,
      title: data.title,
    });

    await site.save();

    // send email confirmation & next steps to creator that the site has successfully been created.

    if (site.owner) {
      site.populate("owner");
      await siteCreated(site.owner.email, site.title, site);
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
