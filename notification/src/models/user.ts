import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface UserAttrs {
  id: string;
  name?: string;
  email: string;
  phone?: number;
  userOfSite: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
  name?: string;
  email: string;
  phone?: number;
  userOfSite: string;
  version: string;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxLength: 32,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      maxLength: 15,
      minLength: 5,
    },
    createSitePermission: {
      type: Boolean,
      default: false,
    },
    userOfSite: {
      type: String,
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
    name: attrs.name,
    phone: attrs.phone,
    email: attrs.email,
    userOfSite: attrs.userOfSite,
  });
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User, UserDoc };
