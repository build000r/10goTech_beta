import mongoose from "mongoose";
import { ProductCreatedListener } from "../events/listeners/product-created-listener";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface ProductAttrs {
  id: string;
  siteOwnerId: string;
  siteTitle: string;
  siteId: string;
  title: string;
}

interface ProductDoc extends mongoose.Document {
  siteOwnerId: string;
  siteTitle: string;
  siteId: string;
  title: string;
  version: string;
}

interface ProductModel extends mongoose.Model<ProductDoc> {
  build(attrs: ProductAttrs): ProductDoc;
}

const productSchema = new mongoose.Schema(
  {
    siteOwnerId: {
      type: String,
      required: true,
    },
    siteTitle: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    siteId: {
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

productSchema.statics.build = (attrs: ProductAttrs) => {
  return new Product({
    _id: attrs.id,
    siteOwnerId: attrs.siteOwnerId,
    siteTitle: attrs.siteTitle,
    title: attrs.title,
    siteId: attrs.siteId,
  });
};

const Product = mongoose.model<ProductDoc, ProductModel>(
  "Product",
  productSchema
);

export { Product, ProductDoc };
