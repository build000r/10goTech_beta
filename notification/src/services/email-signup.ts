import { getSender } from "./email-sender-details";

export const userSignup = async (
  email: string,
  token: string,
  userOfSite: string
) => {
  let { mj, fromName, fromEmail, site, owner, from10GoTech } = await getSender(
    userOfSite
  );

  let activationLink, From;

  switch (userOfSite) {
    case "rfp":
      From = from10GoTech;
      activationLink = `http://www.10gotech.com/admin/${userOfSite}/onboard/${token}`;
      break;
    default:
      (From = {
        Email: fromEmail,
        Name: fromName,
      }),
        (activationLink = `http://www.10gotech.com/user/${userOfSite}/onboard/${token}`);
      break;
  }

  const sent = mj.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From,
        To: [
          {
            Email: email,
            Name: email,
          },
        ],
        Subject: "Activate your Account",
        TextPart: "Activation Email",
        HTMLPart: `<p><a href="${activationLink}">Activate Account</a></p>
          <hr />
          <p>this email may contain sensitive information</p>
          `,
        CustomID: "UserSignup",
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
