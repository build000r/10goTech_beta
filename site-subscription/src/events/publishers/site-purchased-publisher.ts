import { Publisher, SitePurchasedEvent, Subjects } from "@thesaas/common-rfp";

export class SitePurchasedPublisher extends Publisher<SitePurchasedEvent> {
  readonly subject = Subjects.SitePurchased;
}
