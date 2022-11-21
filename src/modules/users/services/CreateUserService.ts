import { User } from "@prisma/client";
import { AppError } from "../../../shared/errors/AppError";
import { prismaClient } from "../../../databases/prismaClient";

interface IRequest {
  name: string;
  email: string;
}

export class CreateUserService {
  async execute({ name, email }: IRequest): Promise<User> {
    const emailExists = await prismaClient.user.findUnique({
      where: { email },
    });

    if (emailExists) throw new AppError("Email address already used");

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
      },
    });

    return user;
  }
}
