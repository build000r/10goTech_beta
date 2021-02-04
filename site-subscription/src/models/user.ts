import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface UserAttrs {
  id: string;
  stripeDetails?: any;
  remainingSites?: number;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
  stripeDetails?: any;
  version: string;
  remainingSites: number;
}

const userSchema = new mongoose.Schema(
  {
    stripeDetails: {},
    remainingSites: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id; // replace mongo's atypical _id naming to more common id
        delete ret._id;
      },
    },
  }
);

userSchema.set("versionKey", "version"); // rename '__v' to 'version'
userSchema.plugin(updateIfCurrentPlugin);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User({
    _id: attrs.id,
    stripeDetails: attrs.stripeDetails,
  });
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User, UserDoc };
