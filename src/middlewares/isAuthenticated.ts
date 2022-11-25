import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { prismaClient } from "../databases/prismaClient";
import authConfig from "../config/auth";
import { AppError } from "../shared/errors/AppError";

interface DecodeToken {
  iat: number;
  exp: number;
  sub: string;
}

export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT Token is missing.");
  }

  // type=Bearer, token=iudbn2idun1-20789db12-udn21
  const [, token] = authHeader.split(" ");

  try {
    const decodeToken = verify(token, authConfig.jwt.secret) as DecodeToken;

    const user = await prismaClient.user.findUnique({
      where: { id: decodeToken.sub },
    });

    if (!user) next(new AppError("User not exist"));

    return next();
  } catch (error) {
    return next(new AppError("Invalid JWT Token."));
  }
}
