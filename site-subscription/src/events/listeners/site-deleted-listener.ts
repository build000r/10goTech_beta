import { Message } from "node-nats-streaming";
import {
  BadRequestError,
  Listener,
  Subjects,
  SiteDeletedEvent,
} from "@thesaas/common-rfp";

import { queueGroupName } from "./queue-group-name";
import { Package } from "../../models/package";
import { User } from "../../models/user";
import { deleteSubscription } from "../../stripe";

export class SiteDeletedListener extends Listener<SiteDeletedEvent> {
  readonly subject = Subjects.SiteDeleted;
  queueGroupName = queueGroupName;

  async onMessage(data: SiteDeletedEvent["data"], msg: Message) {
    console.log("delete stripe subscription", data.subscriptionId);

    await deleteSubscription(data.subscriptionId);
    msg.ack();
  }
}
