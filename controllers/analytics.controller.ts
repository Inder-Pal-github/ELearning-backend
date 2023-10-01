import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncErrors } from "../middlewares/catchAsyncError";
import { generateLast12MonthData } from "../utils/analytics.generator";
import UserModel from "../models/user.model";
import OrderModel from "../models/order.model";
import CourseModel from "../models/course.model";

// user data analytics
export const getUserAnalytics = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await generateLast12MonthData(UserModel);

      res.status(200).json({
        success: true,
        users,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);


// orders data analytics
export const getOrdersAnalytics = CatchAsyncErrors(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const orders = await generateLast12MonthData(OrderModel);
  
        res.status(200).json({
          success: true,
          orders,
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
      }
    }
  );


  // courses data analytics
export const getCoursesAnalytics = CatchAsyncErrors(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const courses = await generateLast12MonthData(CourseModel);
        res.status(200).json({
          success: true,
          courses,
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
      }
    }
  );