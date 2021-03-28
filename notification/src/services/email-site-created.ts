import { SiteDoc } from "../models/site";
import { getSender } from "./email-sender-details";

export const siteCreated = async (
  email: string,
  title: string,
  site: SiteDoc
) => {
  let { mj, from10GoTech } = await getSender(site.title);

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
        Subject: `Site created!`,
        TextPart: "New Site Email",
        HTMLPart: `<p>Next steps:</p>
          <hr />
          <p>Let's get this site up and running ASAP.</p>
          <p> 1. Click "create new service" to make your first service.</p>
          <p> 2. Once you've made your first service, click "edit email" to write the automatic email that is sent when someone orders this service.</p>
          <p> 3. (optional) Click "edit photos" to add photos for that specific service.
          <p> 4. (optional) Click "account" in the top right corner then "update site" to change the homepage text, as well as the email automation, and privacy policy.
         
         <p> By default, your emails are sent out using my NOREPLY email address. I strongly suggest you shoot head over to mailjet.com to configure your own emailing service. I'm planning on making a video on this shortly, but in the meantime, just shoot me an email and I'll help get you set up.</p>  
         
         <hr />
         <p>Thanks!</p>
         <p>Rob Baratta</p>
         <p>this email may contain sensitive information</p>


          `,
        CustomID: "SiteCreated",
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
