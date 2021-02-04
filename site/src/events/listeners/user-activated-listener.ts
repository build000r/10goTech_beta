import { Message } from "node-nats-streaming";
import {
  BadRequestError,
  Listener,
  Subjects,
  UserActivatedEvent,
} from "@thesaas/common-rfp";
import { Site } from "../../models/site";
import { queueGroupName } from "./queue-group-name";

export class UserActivatedListener extends Listener<UserActivatedEvent> {
  readonly subject = Subjects.UserActivated;
  queueGroupName = queueGroupName;

  async onMessage(data: UserActivatedEvent["data"], msg: Message) {
    const { id, email, name, userOfSite } = data;

    const site = await Site.findOne({ title: userOfSite });

    if (!site) {
      throw new BadRequestError("Site does not exist");
    }

    if (site.users.includes(id)) {
      console.log(`user was already activated`);

      msg.ack();
      return;
    }

    site.users.push(id);

    await site.save();

    console.log(`User of site ${userOfSite} has been activated: ${name}`);

    msg.ack();
  }
}
