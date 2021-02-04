import mongoose, { Types } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface SiteAttrs {
  title: string;
  ownerId: string;
  users?: string[];
  orders?: string[];
  services?: string[];
  tagline?: string;
  sendgridApiKey?: string;
  sendFromEmail?: string;
  subscriptionId: string;
  homeTitle?: string;
  aboutUsTitle?: string;
  aboutUsBlurb?: string;
  privacyPolicy?: string;
  termsOfService?: string;
}

interface SiteDoc extends mongoose.Document {
  title: string;
  ownerId: string;
  tagline: string;
  sendgridApiKey: string;
  users: [string];
  orders: [string];
  services: [string];
  sendFromEmail: string;
  createdAt: string;
  version: number;
  subscriptionId: string;
  homeTitle: string;
  aboutUsTitle: string;
  aboutUsBlurb: string;
  privacyPolicy: string;
  termsOfService: string;
}

interface SiteModel extends mongoose.Model<SiteDoc> {
  build(attrs: SiteAttrs): SiteDoc;
}

const siteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    ownerId: {
      type: String,
      required: true,
    },
    tagline: {
      type: String,
      default: "I'm a pro",
    },
    sendFromEmail: {
      type: String,
      default: "recrecs45@gmail.com",
    },
    sendgridApiKey: {
      type: String,
      default:
        "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",
    },
    users: [
      {
        type: String,
      },
    ],
    orders: [
      {
        type: String,
      },
    ],
    services: [
      {
        type: String,
      },
    ],
    subscriptionId: {
      type: String,
      required: true,
    },
    homeTitle: {
      type: String,
      default: "Welcome!",
    },
    aboutUsTitle: {
      type: String,
      default: "About Us",
    },
    aboutUsBlurb: {
      type: String,
      default: "Share some more information about your business here!",
    },
    privacyPolicy: {
      type: String,
      default:
        "By using this website, you agree to a retroactive privacy policy that will be written at some point in the future.",
    },
    termsOfService: {
      type: String,
      default:
        "By using this website, you agree to a retroactive terms of service that will be made in some point in the future. We are not responsible for any loss of data. You agree that we are not liable for any damages. You agree to hold us harmless from any and all claims. ",
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

siteSchema.set("versionKey", "version"); // rename '__v' to 'version'
siteSchema.plugin(updateIfCurrentPlugin);

siteSchema.statics.build = (attrs: SiteAttrs) => {
  return new Site(attrs);
};

const Site = mongoose.model<SiteDoc, SiteModel>("Site", siteSchema);

export { Site };
