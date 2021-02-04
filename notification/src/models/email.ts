// belongs to 1) site, 2) product (sent on order)

// on Event:

import { Subjects } from "@thesaas/common-rfp";

// user activated
// user signup
// order created
//

import { SiteDoc } from "./site";
import { OrderDoc } from "./order";
import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface EmailAttrs {
  onEvent: Subjects; // CRM crmStatus
  order?: OrderDoc;
  productId?: string;
  subject: string;
  body: string;
  site: SiteDoc;
}
interface EmailDoc extends mongoose.Document {
  onEvent: Subjects;
  productId: string;

  order: OrderDoc;
  subject: string;
  body: string;
  site: SiteDoc;
}

interface EmailModel extends mongoose.Model<EmailDoc> {
  build(attrs: EmailAttrs): EmailDoc;
}

const emailSchema = new mongoose.Schema(
  {
    onEvent: {
      type: String,
      required: true,
      enum: Object.values(Subjects),
    },
    subject: {
      type: String,
    },
    body: {
      type: String,
    },
    site: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Site",
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    productId: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

emailSchema.set("versionKey", "version"); // rename '__v' to 'version'
emailSchema.plugin(updateIfCurrentPlugin);

emailSchema.statics.build = (attrs: EmailAttrs) => {
  return new Email(attrs);
};
const Email = mongoose.model<EmailDoc, EmailModel>("Email", emailSchema);

export { Email, EmailDoc };
