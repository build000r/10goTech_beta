import { getSender } from "./email-sender-details";

export const firmActivated = async (
  email: string,
  userOfSite: string,
  name: string
) => {
  // todo: account for custom sg accounts/emails
  let { mj, fromName, fromEmail, site, owner, from10GoTech } = await getSender(
    userOfSite
  );

  const sent = mj.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: from10GoTech,
        To: [
          {
            Email: email,
            Name: email,
          },
        ],
        Subject: "Welcome to 10goTech!",
        TextPart: "Welcome Firm Email",
        HTMLPart: `<p>Your account has been activated.</p>
            <hr />
            <p>Hi,</p>
            <br/>
            <p class="p1">Welcome to 10goTech!</p>
            <p class="p2"><br></p>
            <p class="p1">If you haven&rsquo;t done so already, 1) pick a package (7 day free trial) 2) build your site, and 3) get talking to customers!</p>
            <p class="p2"><br></p>
            <p class="p1">What are you waiting for? Get going!</p>
            <p class="p1">___________</p>
            <p class="p1">Rob Baratta</p>
            <p class="p1">10goTech.com</p>
            `,
        CustomID: "FirmActivated",
      },
    ],
  });

  try {
    const req = await sent;
    console.log(req.body);
  } catch (err) {
    console.log(err.statusCode);
  }

  return { sent: [sent] };
};
