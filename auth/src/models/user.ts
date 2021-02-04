import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface UserAttrs {
  name?: string;
  email: string;
  password: string;
  phone?: number;
  resetPasswordLink?: string;
  userOfSite?: string;
  createSitePermission?: boolean;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
  name?: string;
  email: string;
  password: string;
  phone?: number;
  resetPasswordLink?: string;
  userOfSite?: string;
  createSitePermission?: boolean;
  version: number;
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
      maxlength: 200,
    },
    password: {
      type: String,
      required: true,
      maxlength: 200,
    },
    phone: {
      type: Number,
      trim: true,
      maxLength: 15,
      minLength: 5,
    },
    resetPasswordLink: {
      data: String,
      default: "",
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
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.set("versionKey", "version"); // rename '__v' to 'version'
userSchema.plugin(updateIfCurrentPlugin);

userSchema.index({ email: 1, userOfSite: 1 }, { unique: true });

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User, UserDoc };
