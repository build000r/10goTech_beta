import mongoose from "mongoose";
import { UserDoc } from "./user";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface SiteAttrs {
  id: string;
  title: string;
  owner: UserDoc;
  sendgridApiKey?: string;
  sendFromEmail?: string;
  mailjetPublic?: string;
  mailjetPrivate?: string;
  mailjetFromEmail?: string;
  mailjetFromName?: string;
}

interface SiteDoc extends mongoose.Document {
  title: string;
  owner: UserDoc;
  sendgridApiKey: string;
  sendFromEmail: string;
  version: string;
  mailjetPublic: string;
  mailjetPrivate: string;
  mailjetFromEmail: string;
  mailjetFromName: string;
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
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    sendFromEmail: {
      type: String,
      required: true,
      default: "recrecs45@gmail.com",
    },
    sendgridApiKey: {
      type: String,
      required: true,
      default:
        "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",
    },
    mailjetPublic: {
      type: String,
      required: true,
      default: "e86505e366887ea9004824ee1ea77485",
    },
    mailjetPrivate: {
      type: String,
      required: true,
      default: "7caf765c788d3b2374dcb6bc3ea4afa4",
    },
    mailjetFromEmail: {
      type: String,
      required: true,
      default: "noreply@10gotech.com",
    },
    mailjetFromName: {
      type: String,
      required: true,
      default: "NO REPLY @ 10goTech",
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
  return new Site({
    _id: attrs.id,
    title: attrs.title,
    owner: attrs.owner,
    sendgridApiKey: attrs.sendgridApiKey,
    sendFromEmail: attrs.sendFromEmail,
    mailjetPublic: attrs.mailjetPublic,
    mailjetPrivate: attrs.mailjetPrivate,
    mailjetFromEmail: attrs.mailjetFromEmail,
    mailjetFromName: attrs.mailjetFromName,
  });
};

const Site = mongoose.model<SiteDoc, SiteModel>("Site", siteSchema);

export { Site, SiteDoc };
