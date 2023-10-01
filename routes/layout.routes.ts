import express from "express";
import { authorization, isAuthenticated } from "../middlewares/auth";
import { createLayout } from "../controllers/layout.controller";

const layoutRouter = express.Router();

layoutRouter.post(
  "/create-layout",
  isAuthenticated,
  authorization("admin"),
  createLayout
);

export default layoutRouter;
