import { Message } from "node-nats-streaming";
import {
  BadRequestError,
  Listener,
  Subjects,
  UserActivatedEvent,
} from "@thesaas/common-rfp";
import { User } from "../../models/user";

import { queueGroupName } from "./queue-group-name";

export class UserActivatedListener extends Listener<UserActivatedEvent> {
  readonly subject = Subjects.UserActivated;
  queueGroupName = queueGroupName;

  async onMessage(data: UserActivatedEvent["data"], msg: Message) {
    const { id, userOfSite } = data;

    if (userOfSite === "rfp") {
      /* Is this user a firm? 
          1) store user. questions surrounding introduction of sgmail user
          2) SYSTEM send a welcome message 
      */

      const user = User.build({
        id,
      });

      await user.save();

      console.log(`user ${id} saved to allow payments`);
    }

    msg.ack();
  }
}
