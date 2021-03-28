import sgMail from "@sendgrid/mail";
import { BadRequestError, Subjects } from "@thesaas/common-rfp";
import { Email } from "../models/email";
import { OrderDoc } from "../models/order";
import { Site, SiteDoc } from "../models/site";
import { User, UserDoc } from "../models/user";
import mailjet from "node-mailjet";

// change to env variables...

const sendFrom = "recrecs45@gmail.com";
const url = "http://www.10gotech.com";

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

export {};
