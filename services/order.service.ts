import { NextFunction,Response } from "express";
import { CatchAsyncErrors } from "../middlewares/catchAsyncError";
import OrderModel from "../models/order.model";

// create new order 
export const NewOrder = CatchAsyncErrors(async(data:any,res:Response,next:NextFunction)=>{
    const order = await OrderModel.create(data);
    return res.status(201).json({
        success: true,
        order,
      });
})