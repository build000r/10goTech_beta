import { Message } from "node-nats-streaming";
import {
  BadRequestError,
  Listener,
  NotFoundError,
  SiteUpdatedEvent,
  Subjects,
  UserActivatedEvent,
} from "@thesaas/common-rfp";
import { Site } from "../../models/site";

import { queueGroupName } from "./queue-group-name";
import { User, UserDoc } from "../../models/user";

export class SiteUpdatedListener extends Listener<SiteUpdatedEvent> {
  readonly subject = Subjects.SiteUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: SiteUpdatedEvent["data"], msg: Message) {
    const { id, ownerId, title } = data;

    const site =
      (await Site.findOne({ id })) || (await Site.findOne({ _id: id }));

    if (!site) {
      console.log("cant find site");
      throw new NotFoundError();
    }

    const oldTitle = site.title;

    const users = await User.find({ userOfSite: oldTitle });

    users.forEach(async (user: UserDoc) => {
      console.log("user updating... ", user);
      user.set({ userOfSite: title });
      await user.save();
    });

    site.set({ title });

    await site.save();

    console.log("new site title...", site);

    msg.ack();
  }
}
