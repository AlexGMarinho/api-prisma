import { User } from "@prisma/client";
import { AppError } from "../../../shared/errors/AppError";
import { prismaClient } from "../../../databases/prismaClient";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "../../../config/auth";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

export class CreateSessionsService {
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await prismaClient.user.findUnique({
      where: { email },
    });

    if (!user) throw new AppError("Incorrect email", 401);

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) throw new AppError("incorrect password", 401);

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { user, token };
  }
}
