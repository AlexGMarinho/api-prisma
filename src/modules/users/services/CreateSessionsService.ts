import { User } from "@prisma/client";
import { AppError } from "../../../shared/errors/AppError";
import { prismaClient } from "../../../databases/prismaClient";
import { compare } from "bcryptjs";

interface IRequest {
  email: string;
  password: string;
}

export class CreateSessionsService {
  async execute({ email, password }: IRequest): Promise<User> {
    const user = await prismaClient.user.findUnique({
      where: { email },
    });

    if (!user) throw new AppError("Incorrect email", 401);

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) throw new AppError("incorrect password", 401);

    return user;
  }
}
