import express from "express";
import { authorization, isAuthenticated } from "../middlewares/auth";
import { getCoursesAnalytics, getOrdersAnalytics, getUserAnalytics } from "../controllers/analytics.controller";
const analyticsRouter = express.Router();

analyticsRouter.get(
  "/get-users-analytics",
  isAuthenticated,
  authorization("admin"),
  getUserAnalytics
);

analyticsRouter.get(
  "/get-orders-analytics",
  isAuthenticated,
  authorization("admin"),
  getOrdersAnalytics
);

analyticsRouter.get(
  "/get-courses-analytics",
  isAuthenticated,
  authorization("admin"),
  getCoursesAnalytics
);

export default analyticsRouter;
