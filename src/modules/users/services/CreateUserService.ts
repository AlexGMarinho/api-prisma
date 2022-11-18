import { AppError } from "../../../shared/errors/AppError";
import { User } from "@prisma/client";
import { prismaClient } from "../../../databases/prismaClient";

interface IRquest {
  name: string;
  email: string;
}

export class CreateUserService {
  public async execute({ name, email }: IRquest): Promise<User> {
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
