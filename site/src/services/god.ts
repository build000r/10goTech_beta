import { Site } from "../models/site";
import { SiteCreatedPublisher } from "../events/publishers/site-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const createGod = async () => {
  const siteExists = await Site.findOne({ title: "rfp" });

  if (siteExists) {
    return;
  }

  const site = Site.build({
    title: "rfp",
    ownerId: "6006d4536ee4744a9c4a5a57",
    tagline: "DO the least, MAKE the most, BE the best.",
    subscriptionId: "fjdkslafjdskal",
  });

  await site.save();

  new SiteCreatedPublisher(natsWrapper.client).publish({
    id: site.id!,
    title: site.title,
    ownerId: site.ownerId,
    version: site.version,
  });
};

export { createGod };
