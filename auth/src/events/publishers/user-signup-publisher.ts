import { Publisher, UserSignupEvent, Subjects } from "@thesaas/common-rfp";

export class UserSignupPublisher extends Publisher<UserSignupEvent> {
  readonly subject = Subjects.UserSignup;
}
