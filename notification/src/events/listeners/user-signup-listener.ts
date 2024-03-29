import { Message } from "node-nats-streaming";
import {
  BadRequestError,
  Listener,
  Subjects,
  UserSignupEvent,
} from "@thesaas/common-rfp";
import { userSignup } from "../../services/email-signup";

import { queueGroupName } from "./queue-group-name";

export class UserSignupListener extends Listener<UserSignupEvent> {
  readonly subject = Subjects.UserSignup;
  queueGroupName = queueGroupName;

  async onMessage(data: UserSignupEvent["data"], msg: Message) {
    const { userOfSite, token } = data;

    await userSignup(data.email, data.token, data.userOfSite);

    // is it an "admin" site?

    switch (userOfSite) {
      case "rfp":
        console.log(`https://rfp.com/admin/${userOfSite}/onboard/${token}`);
        msg.ack();
        return;
      default:
        console.log(`https://rfp.com/user/${userOfSite}/onboard/${token}`);
        console.log(`${data.name} signed up for ${data.userOfSite}.`);
        msg.ack();
        return;
    }
  }
}
