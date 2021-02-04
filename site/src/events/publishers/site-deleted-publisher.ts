import { Publisher, SiteDeletedEvent, Subjects } from "@thesaas/common-rfp";

export class SiteDeletedPublisher extends Publisher<SiteDeletedEvent> {
  readonly subject = Subjects.SiteDeleted;
}
