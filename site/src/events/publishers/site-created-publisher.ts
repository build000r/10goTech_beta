import { Publisher, SiteCreatedEvent, Subjects } from "@thesaas/common-rfp";

export class SiteCreatedPublisher extends Publisher<SiteCreatedEvent> {
  readonly subject = Subjects.SiteCreated;
}
