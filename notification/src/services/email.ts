import sgMail from "@sendgrid/mail";
import { BadRequestError, Subjects } from "@thesaas/common-rfp";
import { Email } from "../models/email";
import { OrderDoc } from "../models/order";
import { Site, SiteDoc } from "../models/site";
import { User, UserDoc } from "../models/user";

// change to env variables...

const sendFrom = "recrecs45@gmail.com";
const url = "https://rfp.com";

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const getSgDetails = async (userOfSite: string) => {
  const site = await Site.findOne({ title: userOfSite }).populate("User");

  if (!site) {
    throw new BadRequestError("Site not found");
  }

  console.log("THIS IS THE SITE with the owner, ", site);

  const owner =
    (await User.findOne({ id: site.owner })) ||
    (await User.findOne({ _id: site.owner }));

  if (!owner) {
    throw new BadRequestError("Owner not found");
  }
  return {
    apiKey: site.sendgridApiKey,
    sendFrom: site.sendFromEmail,
    site,
    owner,
  };
};

const fetchEmail = async (onEvent: Subjects, site: SiteDoc) => {
  const email = await Email.findOne({ onEvent, site });

  console.log(email);

  return { subject: email?.subject, body: email?.body };
};

const userSignup = async (email: string, token: string, userOfSite: string) => {
  const { apiKey, sendFrom, site } = await getSgDetails(userOfSite);

  sgMail.setApiKey(site.sendgridApiKey);

  await fetchEmail(Subjects.UserSignup, site);

  let activationLink;

  switch (userOfSite) {
    case "rfp":
      activationLink = `https://rfp.com/admin/${userOfSite}/onboard/${token}`;
      break;
    default:
      activationLink = `https://rfp.com/user/${userOfSite}/onboard/${token}`;
      break;
  }

  const emailData = {
    from: sendFrom,
    to: email,
    subject: `Activate your Account`,
    html: `<p><a href="${activationLink}">Activate Account</a></p>
    <hr />
    <p>this email may contain sensitive information</p>
    <p>${url}</p>
    `,
  };

  const sent = await sgMail.send(emailData);

  return { sent: [sent] };
};

const firmActivated = async (
  email: string,
  userOfSite: string,
  name: string
) => {
  // todo: account for custom sg accounts/emails

  const { apiKey, sendFrom, site } = await getSgDetails(userOfSite);

  sgMail.setApiKey(apiKey);

  const emailData = {
    from: sendFrom,
    to: email,
    subject: `Welcome to 10goTech!`,
    html: `<p>Your account has been activated.</p>
    <hr />
    <p>Hi,</p>
    <br/>
    <p class="p1">I&rsquo;m Rob Baratta, the Founder of 10goTech. During my time as a Product Manager at a Seed-Stage Venture Capital firm, I became an expert at 1) identifying investable business opportunities and 2) building &ldquo;version one&rdquo; of the product.<span class="Apple-converted-space">&nbsp;</span></p>
    <p class="p2"><br></p>
    <p class="p1">It was my job to work directly with the Founder/CEO&rsquo;s our fund just invested in (~$250,000) to produce a Minimum Viable Product (MVP).<span class="Apple-converted-space">&nbsp;</span></p>
    <p class="p2"><br></p>
    <p class="p1">A successful MVP consumes minimal time &amp; money, and enables the founders to maximize learning while interacting with customers:<span class="Apple-converted-space">&nbsp;</span></p>
    <ul class="ul1">
        <li class="li1">Revenue. Is your target customer willing to pay for this?</li>
        <li class="li1">Feedback. What would you like the product/service to do?<span class="Apple-converted-space">&nbsp; &nbsp;</span></li>
    </ul>
    <p class="p2"><br></p>
    <p class="p1">This learning is then leveraged to create versions 2, 3, 4, etc. of the product. In the early stages, these learnings typically result in MASSIVE pivots, which costs time and money.</p>
    <p class="p2"><br></p>
    <p class="p1">Spending more time or money than necessary is bad business! Efficiency is key. Which leads me to why I build this platform.</p>
    <p class="p2"><br></p>
    <p class="p1">I built 10goTech for Founders to maximize learning while spending the least amount of time and money. You won&rsquo;t need $250,000 to build that MVP. You won&rsquo;t prematurely accumulate marketing/technology debt. Used correctly, you&rsquo;ll be able to iterate your way to a highly investable business.<span class="Apple-converted-space">&nbsp;</span></p>
    <p class="p2"><br></p>
    <p class="p1">If you haven&rsquo;t done so already, 1) pick a package (7 day free trial) 2) build your site, and 3) get talking to customers! For strategic guidance from me, select one of the packages that includes consultations.</p>
    <p class="p2"><br></p>
    <p class="p1">What are you waiting for? Get going!</p>
    <p class="p1">___________</p>
    <p class="p1">Rob Baratta</p>
    <p class="p1">Founder</p>
    <p class="p1">10goTech.com</p>
    `,
  };

  const sent = await sgMail.send(emailData);

  return { sent: [sent] };
};

const userActivated = async (email: string, userOfSite: string) => {
  const { apiKey, sendFrom, site } = await getSgDetails(userOfSite);

  console.log(userOfSite);

  await fetchEmail(Subjects.UserActivated, site);

  if (!apiKey || !sendFrom) {
    throw new BadRequestError("apiKey not found");
  }

  sgMail.setApiKey(apiKey);

  let emailData = {
    from: sendFrom,
    to: email,
    subject: `Welcome to ${userOfSite}`,
    html: `<p>Your account has been activated</p>
    <hr />
    <p></p>
    <p>this email may contain sensitive information</p>
    <p>${url}</p>
    `,
  };

  const sentToUser = await sgMail.send(emailData);

  const owner = await User.findOne({ _id: site!.owner });

  if (!owner) {
    throw new BadRequestError("owner not found");
  }

  console.log("owner of site", owner);

  emailData = {
    from: sendFrom,
    to: owner.email,
    subject: `New user signed up for ${userOfSite}`,
    html: `<p>Congrats!</p>
    <hr />
    <p>Head over to your dashboard to view their information, and be on the lookout for any orders they place.</p>
    <p>this email may contain sensitive information</p>
    <p>${url}</p>

    `,
  };

  const sentToOwner = await sgMail.send(emailData);

  // console.log(sentToOwner);

  return { sent: [sentToUser, sentToOwner] };
};

const siteCreated = async (email: string, title: string, site: SiteDoc) => {
  sgMail.setApiKey(site.sendgridApiKey);

  const emailData = {
    from: sendFrom,
    to: email,
    subject: `Site: ${title} created!`,
    html: `<p>Next steps:</p>
    <hr />
    <p>Let's get this site up and running ASAP.</p>
    <p> 1. Click "create new service" to make your first service.</p>
    <p> 2. Once you've made your first service, click "edit email" to write the automatic email that is sent when someone orders this service.</p>
    <p> 3. (optional) Click "edit photos" to add photos for that specific service.
    <p> 4. (optional) Click "account" in the top right corner then "update site" to change the homepage text, as well as the email automation, and privacy policy.
   
   <p> By default, your emails are sent out using my NOREPLY email address. I strongly suggest you head over to sendgrid.com to configure your own email address. I'm planning on making a video on this shortly, but in the meantime, just shoot me an email and I'll help get you set up.</p>  
    <p>this email may contain sensitive information</p>
    <p>${url}</p>

    `,
  };

  const sent = await sgMail.send(emailData);

  return { sent: [sent] };
};

const orderCreatedReceipt = async (orderer: UserDoc, order: OrderDoc) => {
  // send the email for each product.

  const { name, phone, email, userOfSite } = orderer;
  console.log("orderer", orderer);
  const { products } = order;
  const { apiKey, sendFrom, site } = await getSgDetails(userOfSite);

  // create an array of emails for each product. productId
  sgMail.setApiKey(apiKey);

  let productEmails: any[] = [];

  products.map(async (product: any) => {
    const { id, title, clickOptionsSelected, userMessage } = product;

    // find teh email for the product
    const productEmailBody = await Email.findOne({ productId: id });

    if (!productEmailBody) {
      return console.log("productemailbody not found");
    }

    const { subject, body } = productEmailBody;

    const emailData = {
      from: sendFrom,
      to: email,
      subject,
      html: `<p>${body}</p>`,
    };

    const sent = await sgMail.send(emailData);

    console.log(sent);
    productEmails.push(sent);
  });

  return { sent: [productEmails] };
};

const orderCreatedAlert = async (orderer: UserDoc, order: OrderDoc) => {
  const { name, phone, email, userOfSite } = orderer;
  console.log(orderer);
  const { products } = order;
  const { apiKey, sendFrom, site, owner } = await getSgDetails(userOfSite);

  // populate owner info
  // configure email
  // send email

  console.log("IS OWNER.EMAIL ON HERE?", site);

  sgMail.setApiKey(apiKey);

  const emailData = {
    from: sendFrom,
    to: owner.email,
    subject: `New Order Received!`,
    html: `<p>Follow up ASAP & close the sale.</p>
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
    <p>${url}</p>
    `,
  };

  console.log(emailData);

  const sent = await sgMail.send(emailData);

  return { sent: [sent] };
};

export {
  userSignup,
  firmActivated,
  userActivated,
  siteCreated,
  orderCreatedAlert,
  orderCreatedReceipt,
};
