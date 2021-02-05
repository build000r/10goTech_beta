import { Message } from "node-nats-streaming";
import {
  BadRequestError,
  Listener,
  Subjects,
  SiteCreatedEvent,
} from "@thesaas/common-rfp";

import { queueGroupName } from "./queue-group-name";
import { Package } from "../../models/package";
import { User } from "../../models/user";

export class SiteCreatedListener extends Listener<SiteCreatedEvent> {
  readonly subject = Subjects.SiteCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: SiteCreatedEvent["data"], msg: Message) {
    console.log(data.id, data.ownerId, data.title, data.version);

    switch (data.title) {
      case "rfp":
        const solo = Package.build({
          title: "solo",
          site: data.title,
          sites: 1,
          monthlyPrice: 29,
          priceId: "price_1IGVPxAbNtIO9WIzMfUu9Lpg",
          freeTrial: 7,
          description: "Website-only package plus email automation.",
        });

        const scale = Package.build({
          title: "feedback",
          site: data.title,
          sites: 1,
          monthlyPrice: 179,
          priceId: "price_1IGVToAbNtIO9WIzgf2j8mhM",
          freeTrial: 7,
          description:
            "One website plus monthly 1-hour long consultations with a tech startup expert. This package is best suited for those who would like personalized strategic guidance.",
        });

        const sprint = Package.build({
          title: "invest",
          site: data.title,
          sites: 1,
          monthlyPrice: 629,
          priceId: "price_1IGVUWAbNtIO9WIzlzAJh9iH",
          freeTrial: 7,
          description:
            "One website plus bi-monthly 2-hour consulting sessions with a technology startup expert. This package is best suited for those using the website as an MVP for proof of concept to raise funding.",
        });

        await solo.save();
        await scale.save();
        await sprint.save();

        console.log(`creating pricing packages for ${data.title} site`);
        console.log(scale, sprint, solo);
        break;
      default:
        break;
    }

    msg.ack();
  }
}
