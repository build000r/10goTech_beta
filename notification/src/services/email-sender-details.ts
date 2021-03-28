import { BadRequestError } from "@thesaas/common-rfp";
import { Site } from "../models/site";
import { User } from "../models/user";
import mailjet from "node-mailjet";

const getSender = async (userOfSite?: string) => {
  const site = await Site.findOne({ title: userOfSite }).populate("User");

  if (!site) {
    throw new BadRequestError("Site not found");
  }

  const owner =
    (await User.findOne({ id: site.owner })) ||
    (await User.findOne({ _id: site.owner }));

  if (!owner) {
    throw new BadRequestError("Owner not found");
  }

  const mj = mailjet.connect(site.mailjetPublic, site.mailjetPrivate);

  const from10GoTech = {
    Email: "rob@10gotech.com",
    Name: "Rob Baratta (10goTech.com)",
  };

  return {
    mj,
    fromEmail: site.mailjetFromEmail
      ? site.mailjetFromEmail
      : from10GoTech.Email,
    fromName: site.mailjetFromName ? site.mailjetFromName : from10GoTech.Name,
    site,
    owner,
    from10GoTech,
  };
};

export { getSender };
