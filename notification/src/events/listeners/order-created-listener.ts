import { Message } from "node-nats-streaming";
import {
  BadRequestError,
  Listener,
  Subjects,
  OrderCreatedEvent,
  OrderCrmStatus,
} from "@thesaas/common-rfp";
import { orderCreatedAlert } from "../../services/email-order-created-alert";
import { orderCreatedReceipt } from "../../services/email-order-created-receipt";
import { queueGroupName } from "./queue-group-name";
import { Order } from "../../models/order";
import { User, UserDoc } from "../../models/user";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const { userId, products, siteTitle } = data;

    const order = Order.build({
      crmStatus: OrderCrmStatus.Created,
      userId,
      products,
      siteTitle,
    });

    await order.save();

    const orderer =
      (await User.findOne({ id: order.userId })) ||
      (await User.findOne({ _id: order.userId }));

    if (!orderer) {
      throw new BadRequestError(
        "The user who placed this order cannot be found."
      );
    }

    await orderCreatedAlert(orderer, order);
    await orderCreatedReceipt(orderer, order);

    console.log(`ordered`);
    msg.ack();
  }
}
