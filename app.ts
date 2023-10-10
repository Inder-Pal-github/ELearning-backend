import express, { NextFunction, Request, Response } from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
require("dotenv").config();
import { ErrorHandlerMiddleware } from "./middlewares/error";
import userRouter from "./routes/user.routes";
import courseRouter from "./routes/course.route";
import orderRouter from "./routes/order.routes";
import notificationRouter from "./routes/notification.routes";
import analyticsRouter from "./routes/analytics.routes";
import layoutRouter from "./routes/layout.routes";

// swagger UI and jsdoc
import swaggerUi from "swagger-ui-express";
import swaggerJSdoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ELearning Swagger",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./routes/*.ts"],
};

const swaggerSpec = swaggerJSdoc(swaggerOptions);
// use swagger as middleware
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// body-parser
app.use(express.json({ limit: "50mb" }));

// cookie-parser
app.use(cookieParser());

// cors => cross origin resource sharing
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

// routes
app.use(
  "/api/v1",
  userRouter,
  courseRouter,
  orderRouter,
  notificationRouter,
  analyticsRouter,
  layoutRouter
); // shortcut for mulitple routes
// app.use("/api/v1", courseRouter);
// app.use("/api/v1", orderRouter);

// testing api
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found.`) as any;
  err.statusCode = 404;
  next(err);
});

app.use(ErrorHandlerMiddleware);
