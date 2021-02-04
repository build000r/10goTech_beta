import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface SiteAttrs {
  id?: string;
  title: string;
  tagline?: string;
  ownerId: string;
  sendgridApiKey?: string;
  sendFromEmail?: string;
}

interface SiteDoc extends mongoose.Document {
  title: string;
  tagline?: string;
  ownerId: string;
  sendgridApiKey: string;
  userEmails: [string]; // compare to "orderId" in ticket doc
  sendFromEmail: string;
  version: number;
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
    tagline: {
      type: String,
    },
    ownerId: {
      type: String,
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
    userEmails: [
      {
        type: String,
      },
    ],
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
  return new Site({
    _id: attrs.id,
    title: attrs.title,
    tagline: attrs.tagline,
    ownerId: attrs.ownerId,
    sendgridApiKey: attrs.sendgridApiKey,
    sendFromEmail: attrs.sendFromEmail,
  });
};

const Site = mongoose.model<SiteDoc, SiteModel>("Site", siteSchema);

export { Site };
