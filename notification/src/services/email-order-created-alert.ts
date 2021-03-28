import { OrderDoc } from "../models/order";
import { UserDoc } from "../models/user";
import { getSender } from "./email-sender-details";

export const orderCreatedAlert = async (orderer: UserDoc, order: OrderDoc) => {
  const { name, phone, email, userOfSite } = orderer;

  const { products } = order;

  let { mj, fromName, fromEmail, from10GoTech, owner } = await getSender(
    userOfSite
  );

  const sentToOwner = mj.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: from10GoTech,
        To: [
          {
            Email: owner.email,
            Name: owner.email,
          },
        ],
        Subject: `New Order Received!`,
        TextPart: "Order Received",
        HTMLPart: `<p>Follow up ASAP & close the sale.</p>
            <hr />
            <p><strong>Lead Information</strong></p>
            <p>name: ${name}</p>
            <p>email: ${email}</p>
            <p>phone: ${phone}</p>
            <hr />
            <p><strong>Order Information (${products.length})</strong></p>
            ${products.map((product: any) => {
              const { id, title, clickOptionsSelected, userMessage } = product;

              const listSelectedOptions = `<ul> ${clickOptionsSelected.map(
                ({ name }: any) => `<li>${name}</li>`
              )}</ul>`;

              return `<hr />
                <p>${title}</p>
                ${listSelectedOptions} 
                <p>User message to you: ${userMessage} </p>
                `;
            })}
            <p>this email may contain sensitive information</p>
            <p>For additional information, head over to the "order" section on your sites dashboard.</p>
       
            `,
        CustomID: "OrderCreatedAlert",
      },
    ],
  });

  try {
    const req = await sentToOwner;
    console.log(req.body);
  } catch (err) {
    console.log(err.statusCode);
  }

  return { sent: [sentToOwner] };
};
