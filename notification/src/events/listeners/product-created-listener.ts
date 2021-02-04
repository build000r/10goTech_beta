import {
  BadRequestError,
  Listener,
  Subjects,
  ProductCreatedEvent,
} from "@thesaas/common-rfp";
import { Message } from "node-nats-streaming";

import { queueGroupName } from "./queue-group-name";
import { Email } from "../../models/email";
import { Site } from "../../models/site";

export class ProductCreatedListener extends Listener<ProductCreatedEvent> {
  readonly subject = Subjects.ProductCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: ProductCreatedEvent["data"], msg: Message) {
    const { id, siteTitle, title, siteId } = data;

    // create the base email for replying to product inquiries

    const site =
      (await Site.findOne({ _id: siteId })) ||
      (await Site.findOne({ id: siteId }));

    if (!site) {
      throw new BadRequestError("site not found");
    }

    const email = Email.build({
      onEvent: Subjects.OrderCreated,
      productId: id,
      subject: `Order for ${title} received!`,
      body: "Thanks! We will be following up shortly with the next steps.",
      site,
    });

    await email.save();

    console.log(email);

    msg.ack();
  }
}
