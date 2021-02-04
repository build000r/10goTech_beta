import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface PackageAttrs {
  title: string;
  priceId: string;
  description: string;
  freeTrial: number;
  monthlyPrice: number;
  site: string;
  sites: number;
}

interface PackageDoc extends mongoose.Document {
  title: string;
  priceId: string;
  description: string;
  freeTrial: number;
  monthlyPrice: number;
  site: string;
  sites: number;
  version: number;
}

interface PackageModel extends mongoose.Model<PackageDoc> {
  build(attrs: PackageAttrs): PackageDoc;
}

const PackageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priceId: {
      type: String,
      required: true,
    },
    freeTrial: {
      type: Number,
      required: true,
    },
    monthlyPrice: {
      type: Number,
      required: true,
    },
    site: {
      type: String,
      required: true,
    },
    sites: {
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
PackageSchema.set("versionKey", "version"); // rename '__v' to 'version'
PackageSchema.plugin(updateIfCurrentPlugin);

PackageSchema.statics.build = (attrs: PackageAttrs) => {
  return new Package(attrs);
};

const Package = mongoose.model<PackageDoc, PackageModel>(
  "Package",
  PackageSchema
);

export { Package };
