import mongoose, { Types } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { pp, ua } from "./legal";

interface DocAttrs {
  userAgreement: string;
  userIds?: string[];
}

interface DocDoc extends mongoose.Document {
  userAgreement: string;
  userIds?: string[];
}

interface DocModel extends mongoose.Model<DocDoc> {
  build(attrs: DocAttrs): DocDoc;
}

const docSchema = new mongoose.Schema(
  {
    userAgreement: {
      type: String,
      default: ua,
    },
    userIds: [{ type: String }],
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

docSchema.set("versionKey", "version"); // rename '__v' to 'version'
docSchema.plugin(updateIfCurrentPlugin);

docSchema.statics.build = (attrs: DocAttrs) => {
  return new Doc(attrs);
};

const Doc = mongoose.model<DocDoc, DocModel>("Doc", docSchema);

export { Doc };
