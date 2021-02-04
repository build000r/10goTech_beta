import { Publisher, SiteUpdatedEvent, Subjects } from "@thesaas/common-rfp";

export class SiteUpdatedPublisher extends Publisher<SiteUpdatedEvent> {
  readonly subject = Subjects.SiteUpdated;
}
