// add to

// create a site... THEN allow them to edit it.

/* options:

1) create a site -> don't allow people to create their own sites. ONly allow them to edit them
2) update the site... 

*/

import { Message } from "node-nats-streaming";
import {
  BadRequestError,
  Listener,
  Subjects,
  SitePurchasedEvent,
} from "@thesaas/common-rfp";

import { queueGroupName } from "./queue-group-name";
import { Site } from "../../models/site";
import { SiteCreatedPublisher } from "../publishers/site-created-publisher";
import { natsWrapper } from "../../nats-wrapper";

export class SitePurchasedListener extends Listener<SitePurchasedEvent> {
  readonly subject = Subjects.SitePurchased;
  queueGroupName = queueGroupName;

  async onMessage(data: SitePurchasedEvent["data"], msg: Message) {
    console.log(data);

    // create site with temporary title

    let existingSite = await Site.find({ ownerId: data.ownerId });

    const title =
      "Change_This_Title_" + data.ownerId + "_temp_" + existingSite.length;

    const site = Site.build({
      title,
      ownerId: data.ownerId,
      subscriptionId: data.subscriptionId,
    });

    await site.save();

    await new SiteCreatedPublisher(natsWrapper.client).publish({
      id: site.id!, // bug with site doc? pin mongoose version.
      title: site.title,
      ownerId: site.ownerId,
      version: site.version,
    });

    msg.ack();
  }
}
