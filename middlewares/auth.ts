import { Request, Response, NextFunction } from "express";
import { CatchAsyncErrors } from "./catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redis } from "../utils/redis";


// authenticate user
export const isAuthenticated = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token;
    console.log(req.cookies);
    console.log(access_token);
    if (!access_token) {
      return next(
        new ErrorHandler("Please login to access this resource", 400)
      );
    }

    const decoded = jwt.verify(
      access_token,
      process.env.ACCESS_TOKEN as string
    );

    if (!decoded) {
      return next(new ErrorHandler("Invalid access token", 400));
    }

    const user = await redis.get((decoded as JwtPayload).id);

    if (!user) {
      return next(new ErrorHandler("User not found", 400));
    }

    req.user = JSON.parse(user);
    next();
  }
);
