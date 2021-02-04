import { Publisher, OrderCreatedEvent, Subjects } from "@thesaas/common-rfp";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
