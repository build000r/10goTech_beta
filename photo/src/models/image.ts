import mongoose, { Types } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface ProductImageAttrs {
  productId: string;
  caption?: string;
  photo?: Buffer;
}

interface ProductImageDoc extends mongoose.Document {
  productId: string;
  caption: string;
  photo: Buffer;
}

interface ProductImageModel extends mongoose.Model<ProductImageDoc> {
  build(attrs: ProductImageAttrs): ProductImageDoc;
}

const productImageSchema = new mongoose.Schema(
  {
    photo: {
      type: Buffer,
    },
    caption: {
      type: String,
    },
    productId: {
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

productImageSchema.set("versionKey", "version"); // rename '__v' to 'version'
productImageSchema.plugin(updateIfCurrentPlugin);

productImageSchema.statics.build = (attrs: ProductImageAttrs) => {
  return new ProductImage(attrs);
};

const ProductImage = mongoose.model<ProductImageDoc, ProductImageModel>(
  "ProductImage",
  productImageSchema
);

export { ProductImage };
