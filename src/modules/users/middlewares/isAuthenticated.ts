import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "../../../config/auth";
import { AppError } from "../../../shared/errors/AppError";

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT Token is missing.");
  }

  // type=Bearer, token=iudbn2idun1-20789db12-udn21
  const [, token] = authHeader.split(" ");

  try {
    const decodeToken = verify(token, authConfig.jwt.secret);

    return next();
  } catch (error) {
    throw new AppError("Invalid JWT Token.");
  }
}
