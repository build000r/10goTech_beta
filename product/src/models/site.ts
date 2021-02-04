import mongoose from "mongoose";
import { ProductDoc } from "./product";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface SiteAttrs {
  id: string;
  title: string;
  ownerId: string;
}

interface SiteDoc extends mongoose.Document {
  title: string;
  ownerId: string;
  createdAt: string;
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
    ownerId: {
      type: String,
      required: true,
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
    ownerId: attrs.ownerId,
  });
};

const Site = mongoose.model<SiteDoc, SiteModel>("Site", siteSchema);

export { Site, SiteDoc };
