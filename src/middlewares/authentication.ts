// import types from express
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../utils/env";

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.headers?.authorization) {
    res.status(401);
    throw new Error("🚫 Un-Authorized 🚫");
  }

  try {
    const token = req.headers?.authorization.split(" ")[1];
    // check if test env is true
    const payload = jwt.verify(token, env.JWT_ACCESS_SECRET);
    //@ts-ignore FIX THIS LATER
    req.userId = payload.userId;
  } catch (err: any) {
    res.status(401);
    if (err?.name === "TokenExpiredError") {
      throw new Error(err.name);
    }
    console.log("ERROR:", JSON.stringify(err, null, 2));
    throw new Error("🚫 Un-Authorized 🚫");
  }

  return next();
}
