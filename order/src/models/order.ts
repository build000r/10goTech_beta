import mongoose from "mongoose";
import { BadRequestError, OrderCrmStatus } from "@thesaas/common-rfp";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface OrderAttrs {
  userId: string;
  crmStatus: OrderCrmStatus;
  products: any;
  ownerNote?: string;
}
interface OrderDoc extends mongoose.Document {
  userId: string;
  crmStatus: OrderCrmStatus;
  products: any;
  ownerNote?: string;
  createdAt: string;
  version: number;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    crmStatus: {
      type: String,
      required: true,
      enum: Object.values(OrderCrmStatus),
      default: OrderCrmStatus.Created,
    },
    products: [
      {
        id: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        brief: {
          type: String,
          required: true,
        },
        clickOptions: {},
        clickOptionsSelected: {},
        site: {},
        userMessage: {
          type: String,
          maxlength: 1000,
        },
        version: {
          type: Number,
        },
      },
    ],
    ownerNote: {
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

orderSchema.set("versionKey", "version"); // rename '__v' to 'version'
orderSchema.plugin(updateIfCurrentPlugin);

// orderSchema.statics.isAdmin = async function (ownerId: string) {
//   const order = await Order.findOne(this);

//   if (!order) {
//     throw new BadRequestError("Order not found");
//   }

//   order.populate("Product");

//   return order.products[0].siteOwnerId === ownerId;
// };

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};
const Order = mongoose.model<OrderDoc, OrderModel>("Order", orderSchema);

export { Order, OrderDoc };
