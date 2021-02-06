import { Message } from "node-nats-streaming";
import { Listener, SiteCreatedEvent, Subjects } from "@thesaas/common-rfp";
import { Site } from "../../models/site";
import { queueGroupName } from "./queue-group-name";

export class SiteCreatedListener extends Listener<SiteCreatedEvent> {
  readonly subject = Subjects.SiteCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: SiteCreatedEvent["data"], msg: Message) {
    const { id, ownerId, title } = data;

    console.log(`Site has been created: ${data.title}`);

    const siteExists = await Site.findOne({ title });
    if (siteExists) {
      msg.ack();
      return;
    }

    const site = Site.build({
      id,
      ownerId,
      title,
    });

    await site.save();

    msg.ack();
  }
}
