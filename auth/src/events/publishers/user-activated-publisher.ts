import { Publisher, UserActivatedEvent, Subjects } from "@thesaas/common-rfp";

export class UserActivatedPublisher extends Publisher<UserActivatedEvent> {
  readonly subject = Subjects.UserActivated;
}
