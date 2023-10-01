import { NextFunction, Response } from "express";
import { CatchAsyncErrors } from "../middlewares/catchAsyncError";
import OrderModel from "../models/order.model";

// create new order
export const NewOrder = CatchAsyncErrors(
  async (data: any, res: Response, next: NextFunction) => {
    const order = await OrderModel.create(data);
    return res.status(201).json({
      success: true,
      order,
    });
  }
);

// get all orders
export const getAllOrdersService = async (res: Response) => {
  const orders = await OrderModel.find().sort({ createdAt: -1 });
  return res.status(200).json({
    success: true,
    orders,
  });
};
