import { BadRequestError } from "@thesaas/common-rfp";
import { getSender } from "./email-sender-details";

export const userActivated = async (email: string, userOfSite: string) => {
  let { mj, fromName, fromEmail, from10GoTech, owner } = await getSender(
    userOfSite
  );

  const sentToUser = mj.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: fromEmail,
          Name: fromName,
        },
        To: [
          {
            Email: email,
            Name: email,
          },
        ],
        Subject: `Welcome to ${userOfSite}`,
        TextPart: "Welcome User Email",
        HTMLPart: `<p>Your account has been activated</p>
          <hr />
          <p></p>
          <p>this email may contain sensitive information</p>
          `,
        CustomID: "UserActivated",
      },
    ],
  });

  try {
    const req = await sentToUser;
    console.log(req.body);
  } catch (err) {
    console.log(err.statusCode);
  }

  if (!owner) {
    throw new BadRequestError("owner not found");
  }

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
        Subject: `New user signed up for ${userOfSite}`,
        TextPart: "Welcome User Owner Email",
        HTMLPart: `<p>Congrats!</p>
            <hr />
            <p>Log in to your dashboard @ <a href="https://www.10gotech.com">10gotech.com</a> to view their information, and be on the lookout for any orders they place.</p>
            <p>this email may contain sensitive information</p>
        
            `,
        CustomID: "UserActivated",
      },
    ],
  });

  try {
    const req = await sentToOwner;
    console.log(req.body);
  } catch (err) {
    console.log(err.statusCode);
  }

  return { sent: [sentToUser, sentToOwner] };
};
