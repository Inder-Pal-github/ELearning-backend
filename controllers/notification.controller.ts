import { CatchAsyncErrors } from "../middlewares/catchAsyncError";
import NotificationModel from "../models/notification.model";
import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";

// get all notifications -- only admin
export const getNotification = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notifications = await NotificationModel.find().sort({
        createdAt: -1,
      });
      res.status(200).json({
        success: true,
        notifications,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// update notifications status --- only admin

export const updateNotification = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notification = await NotificationModel.findById(req.params.id);
      if (!notification) {
        return next(new ErrorHandler("Notification not found", 400));
      } else {
        notification?.status
          ? (notification.status = "read")
          : notification?.status;
      }
      await notification.save();

      const notifications = await NotificationModel.find().sort({createdAt:-1});
      return res.status(201).json({
        success:true,
        notifications
      })
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
