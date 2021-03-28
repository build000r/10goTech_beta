import { Email } from "../models/email";
import { OrderDoc } from "../models/order";
import { UserDoc } from "../models/user";
import { getSender } from "./email-sender-details";

export const orderCreatedReceipt = async (
  orderer: UserDoc,
  order: OrderDoc
) => {
  // send the email for each product.

  const { name, phone, email, userOfSite } = orderer;
  console.log("orderer", orderer);
  const { products } = order;

  let { mj, fromName, fromEmail, owner } = await getSender(userOfSite);

  // create an array of emails for each product. productId
  let productEmails: any[] = [];

  products.map(async (product: any) => {
    const { id, title, clickOptionsSelected, userMessage } = product;

    // find teh email for the product
    const productEmailBody = await Email.findOne({ productId: id });

    if (!productEmailBody) {
      return console.log("productemailbody not found");
    }

    const { subject, body } = productEmailBody;

    const sent = mj.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: fromEmail,
            Name: fromName,
          },
          To: [
            {
              Email: owner.email,
              Name: owner.email,
            },
          ],
          Subject: subject,
          TextPart: "Order Receipt",
          HTMLPart: body,
          CustomID: "OrderCreatedReceipt",
        },
      ],
    });

    try {
      const req = await sent;
      console.log(req.body);
    } catch (err) {
      console.log(err.statusCode);
    }
    productEmails.push(sent);
  });

  return { sent: [productEmails] };
};
