import express from "express";
import { authorization, isAuthenticated } from "../middlewares/auth";
import {
  getNotification,
  updateNotification,
} from "../controllers/notification.controller";
const notificationRouter = express.Router();

notificationRouter.get(
  "/get-all-notifications",
  isAuthenticated,
  authorization("admin"),
  getNotification
);

notificationRouter.put(
  "/update-notification/:id",
  isAuthenticated,
  authorization("admin"),
  updateNotification
);

export default notificationRouter;
