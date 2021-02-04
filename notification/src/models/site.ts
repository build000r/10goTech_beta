import mongoose from "mongoose";
import { UserDoc } from "./user";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface SiteAttrs {
  id: string;
  title: string;
  owner?: UserDoc;
  sendgridApiKey?: string;
  sendFromEmail?: string;
}

interface SiteDoc extends mongoose.Document {
  title: string;
  owner: UserDoc;
  sendgridApiKey: string;
  sendFromEmail: string;
  version: string;
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
  });
};

const Site = mongoose.model<SiteDoc, SiteModel>("Site", siteSchema);

export { Site, SiteDoc };
