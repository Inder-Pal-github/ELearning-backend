import mongoose, { Document, Schema, Model } from "mongoose";

export interface IOrder extends Document {
  courseId: string;
  userId: string;
  payment_info: object;
}

const OrderSchema: Schema<IOrder> = new Schema(
  {
    courseId: { type: String, required: true },
    userId: { type: String, required: true },
    payment_info: { type: Object },
  },
  { timestamps: true }
);

const OrderModel: Model<IOrder> = mongoose.model("Order", OrderSchema);

export default OrderModel;
