import { Message } from "node-nats-streaming";
import {
  BadRequestError,
  Listener,
  SiteCreatedEvent,
  Subjects,
  UserActivatedEvent,
} from "@thesaas/common-rfp";
import { Site } from "../../models/site";

import { queueGroupName } from "./queue-group-name";

export class SiteCreatedListener extends Listener<SiteCreatedEvent> {
  readonly subject = Subjects.SiteCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: SiteCreatedEvent["data"], msg: Message) {
    const { id, ownerId, title } = data;

    // need to solve concurrency issues
    const siteExists = await Site.findOne({ title: data.title });

    if (siteExists) {
      msg.ack();
      return;
    }

    //

    const site = Site.build({ id, ownerId, title });

    await site.save();

    msg.ack();
  }
}
