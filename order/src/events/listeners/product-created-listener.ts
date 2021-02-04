import { Message } from "node-nats-streaming";
import {
  BadRequestError,
  Listener,
  ProductCreatedEvent,
  Subjects,
  UserActivatedEvent,
} from "@thesaas/common-rfp";
import { Product } from "../../models/product";
import { queueGroupName } from "./queue-group-name";

export class ProductCreatedListener extends Listener<ProductCreatedEvent> {
  readonly subject = Subjects.ProductCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: ProductCreatedEvent["data"], msg: Message) {
    const { id, siteTitle, ownerId, title, siteId } = data;

    console.log(data.title);

    // concurrency issue quick solve....
    const existingProduct = await Product.findOne({ id });

    if (existingProduct) {
      msg.ack();
      return;
    }
    //

    console.log("siteId", data.siteId);

    const product = Product.build({
      id,
      siteOwnerId: ownerId,
      title,
      siteTitle,
      siteId,
    });

    await product.save();

    console.log(product);

    msg.ack();
  }
}
