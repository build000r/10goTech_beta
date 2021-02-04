import { Message } from "node-nats-streaming";
import {
  BadRequestError,
  Listener,
  Subjects,
  OrderCreatedEvent,
} from "@thesaas/common-rfp";
import { orderCreatedReceipt, orderCreatedAlert } from "../../services/email";
import { queueGroupName } from "./queue-group-name";
// import { Order } from "../../models/order";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const { userId, productTitle, siteTitle } = data;

    // const order = Order.build({
    //   userId: "",
    //   productTitle: "",
    //   siteId: "",
    // });

    // await order.save();

    // send teh PRODUCT ID
    console.log("order created");

    await orderCreatedReceipt("email");
    await orderCreatedAlert("email");

    console.log(`ordered`);
    msg.ack();
  }
}
