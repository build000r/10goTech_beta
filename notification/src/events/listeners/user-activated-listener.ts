import { Message } from "node-nats-streaming";
import {
  BadRequestError,
  Listener,
  Subjects,
  UserActivatedEvent,
} from "@thesaas/common-rfp";
import { userActivated } from "../../services/email-user-activated";
import { firmActivated } from "../../services/email-firm-activated";
import { User } from "../../models/user";

import { queueGroupName } from "./queue-group-name";

export class UserActivatedListener extends Listener<UserActivatedEvent> {
  readonly subject = Subjects.UserActivated;
  queueGroupName = queueGroupName;

  async onMessage(data: UserActivatedEvent["data"], msg: Message) {
    const { id, email, name, userOfSite } = data;

    const user = User.build({
      email,
      userOfSite,
      id,
      name,
    });

    await user.save();

    if (user.userOfSite === "rfp") {
      /* Is this user a firm? 
          1) store user. questions surrounding introduction of sgmail user
          2) SYSTEM send a welcome message 
      */
      await firmActivated(
        user.email,
        user.userOfSite,
        user.name ? user.name : ""
      );
    } else {
      /* Is this a user of firm?
          1) lookup the welcome message for the site they signed up for. If none, use default.
          2) SYSTEM send message to firm
      */
      await userActivated(user.email, user.userOfSite);
    }

    console.log(`${user.name} activated. there are todo items`);

    msg.ack();
  }
}
