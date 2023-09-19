import jwt from "jsonwebtoken";
require("dotenv").config();
import { Response } from "express";
import { IUser } from "../models/user.model";
import { redis } from "./redis";

interface ITokenOptions {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: "lax" | "strict" | "none" | undefined;
  secure?: boolean;
}

  // parse environment variables to intergrate with fallback values
  const accessTokenExpiry = parseInt(
    process.env.ACCESS_TOKEN_EXPIRY || "5",
    10
  );
  const refreshTokenExpiry = parseInt(
    process.env.REFRESH_TOKEN_EXPIRY || "3",
    10
  );

  // option for cookies
  export const accessTokenOptions: ITokenOptions = {
    expires: new Date(Date.now() + accessTokenExpiry * 60 * 60 * 1000),
    maxAge: accessTokenExpiry * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
  };
  export const refreshTokenOptions: ITokenOptions = {
    expires: new Date(Date.now() + refreshTokenExpiry * 24 * 60 * 60 * 1000),
    maxAge: refreshTokenExpiry * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
  };

export const sendToken = (user: IUser, statusCode: number, res: Response) => {
  const accessToken = user.SignAccessToken();
  const refreshToken = user.SignRefreshToken();

  // upload session to redis
  redis.set(user._id, JSON.stringify(user) as any);


  // only set secure to true in production
  if (process.env.NODE_ENV === "production") {
    accessTokenOptions.secure = true;
    refreshTokenOptions.secure = true;
  }

  res.cookie("access_token", accessToken, accessTokenOptions);
  res.cookie("refresh_token", refreshToken, refreshTokenOptions);

  res.status(statusCode).json({
    success: true,
    user,
    accessToken,
  });
};
