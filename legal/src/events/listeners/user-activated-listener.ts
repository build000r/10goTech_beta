import { Message } from "node-nats-streaming";
import {
  BadRequestError,
  Listener,
  NotFoundError,
  Subjects,
  UserActivatedEvent,
} from "@thesaas/common-rfp";

import { queueGroupName } from "./queue-group-name";
import { Doc } from "../../models/doc";

export class UserActivatedListener extends Listener<UserActivatedEvent> {
  readonly subject = Subjects.UserActivated;
  queueGroupName = queueGroupName;

  async onMessage(data: UserActivatedEvent["data"], msg: Message) {
    const { id, userOfSite } = data;

    if (userOfSite !== "rfp") {
      return msg.ack();
    }

    const doc = await Doc.findOne().sort({ date: -1 }).limit(1);

    if (!doc) {
      throw new NotFoundError();
    }

    doc?.userIds?.push(id);
    doc.save();

    msg.ack();
  }
}
