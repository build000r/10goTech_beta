import mongoose from "mongoose";
import { SiteDoc } from "./site";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface ProductAttrs {
  site?: SiteDoc;
  title: string;
  brief?: string;
  description?: string;
  slug: string;
  clickOptions?: any;
  nextStepEmailSubject?: string;
  nextStepEmailBody?: string;
}

interface ProductDoc extends mongoose.Document {
  site?: SiteDoc;
  title: string;
  brief?: string;
  description?: string;
  slug: string;
  version: number;
  clickOptions?: any;
  nextStepEmailSubject?: string;
  nextStepEmailBody?: string;
}

interface ProductModel extends mongoose.Model<ProductDoc> {
  build(attrs: ProductAttrs): ProductDoc;
}

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    brief: {
      type: String,
    },
    description: {
      type: String,
    },
    site: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Site",
    },
    clickOptions: {},
    nextStepEmailSubject: { type: String },
    nextStepEmailBody: { type: String },
    slug: {
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

productSchema.set("versionKey", "version"); // rename '__v' to 'version'
productSchema.plugin(updateIfCurrentPlugin);

productSchema.index({ site: 1, title: 1 }, { unique: true });

productSchema.statics.build = (attrs: ProductAttrs) => {
  return new Product(attrs);
};

const Product = mongoose.model<ProductDoc, ProductModel>(
  "Product",
  productSchema
);

export { Product, ProductDoc };
