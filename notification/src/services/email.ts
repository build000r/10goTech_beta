import sgMail from "@sendgrid/mail";
import { BadRequestError, Subjects } from "@thesaas/common-rfp";
import { Email } from "../models/email";
import { Site, SiteDoc } from "../models/site";
import { User } from "../models/user";

// change to env variables...

const sendFrom = "recrecs45@gmail.com";
const url = "https://rfp.com";

const getSgDetails = async (userOfSite: string) => {
  const site = await Site.findOne({ title: userOfSite });

  if (!site) {
    throw new BadRequestError("Site not found");
  }

  return {
    apiKey: site.sendgridApiKey,
    sendFrom: site.sendFromEmail,
    site,
  };
};

const fetchEmail = async (onEvent: Subjects, site: SiteDoc) => {
  const email = await Email.findOne({ onEvent, site });

  console.log(email);

  return { subject: email?.subject, body: email?.body };
};

const userSignup = async (
  email: string,
  token: string,
  userOfSite: string,
  site: SiteDoc
) => {
  // todo: account for custom sg accounts/emails
  sgMail.setApiKey(site.sendgridApiKey);

  await fetchEmail(Subjects.UserSignup, site);

  const emailData = {
    from: sendFrom,
    to: email,
    subject: `Activate your ${userOfSite} account`,
    html: `<p><a href="${url}/${userOfSite}/auth/${token}">Activate Account</a></p>
    <hr />
    <p>this email may contain sensitive information</p>
    <p>${url}</p>
    `,
  };

  const sent = await sgMail.send(emailData);

  return { sent: [sent] };
};

const firmActivated = async (email: string, userOfSite: string) => {
  // todo: account for custom sg accounts/emails

  const { apiKey, sendFrom, site } = await getSgDetails(userOfSite);

  sgMail.setApiKey(site.sendgridApiKey);

  const emailData = {
    from: sendFrom,
    to: email,
    subject: `Welcome to ${userOfSite}`,
    html: `<p>Your account has been activated</p>
    <hr />
    <p> Next Steps: </p>
    <p>this email may contain sensitive information</p>
    <p>${url}</p>

    `,
  };

  const sent = await sgMail.send(emailData);

  return { sent: [sent] };
};

const siteCreated = async (email: string, title: string, site: SiteDoc) => {
  sgMail.setApiKey(site.sendgridApiKey);

  const emailData = {
    from: sendFrom,
    to: email,
    subject: `Site: ${title} created!`,
    html: `<p>Next steps:</p>
    <hr />
    <p> 1) update sendgrid Api / sendfrom details </p>
    <p>this email may contain sensitive information</p>
    <p>${url}</p>

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

  // const sentToUser = await sgMail.send(emailData);

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
    <p></p>
    <p>this email may contain sensitive information</p>
    <p>${url}</p>

    `,
  };

  // const sentToOwner = await sgMail.send(emailData);

  // console.log(sentToOwner);

  // return { sent: [sentToUser, sentToOwner] };
};

const orderCreatedReceipt = async (email: string) => {
  return console.log("todo email to orderer");
};

const orderCreatedAlert = async (email: string) => {
  return console.log("todo email to creator of product");
};

export {
  userSignup,
  firmActivated,
  userActivated,
  siteCreated,
  orderCreatedAlert,
  orderCreatedReceipt,
};
