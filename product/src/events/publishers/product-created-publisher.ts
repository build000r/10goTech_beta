import { Publisher, ProductCreatedEvent, Subjects } from "@thesaas/common-rfp";

export class ProductCreatedPublisher extends Publisher<ProductCreatedEvent> {
  readonly subject = Subjects.ProductCreated;
}
