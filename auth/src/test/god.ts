import { Site } from "../models/site";
import { User } from "../models/user";
import { Password } from "../services/password";

const createGod = async () => {
  const userExists = await User.findOne({ email: "robbaratta7@gmail.com" });

  if (userExists) {
    return;
  }

  const superUser = User.build({
    name: "rob",
    email: "robbaratta7@gmail.com",
    createSitePermission: true,
    phone: 12312321,
    password: await Password.toHash("terriblePassword1"),
  });

  await superUser.save();

  const baseSite = Site.build({
    title: "rfp",
    ownerId: superUser.id!,
    tagline: "DO the least, MAKE the most, BE the best.",
  });

  await baseSite.save();

  const otherSite = Site.build({
    title: "otherSite",
    ownerId: superUser.id!,
    tagline: "I'm a consultant",
  });

  await otherSite.save();

  const otherSite2 = Site.build({
    title: "otherSite2",
    ownerId: superUser.id!,
    tagline: "I'm a consultant",
  });

  await otherSite2.save();
};

export { createGod };
