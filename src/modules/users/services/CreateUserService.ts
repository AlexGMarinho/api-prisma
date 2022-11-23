import { User } from "@prisma/client";
import { AppError } from "../../../shared/errors/AppError";
import { prismaClient } from "../../../databases/prismaClient";
import { hash } from "bcryptjs";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUserService {
  async execute({ name, email, password }: IRequest): Promise<User> {
    const emailExists = await prismaClient.user.findUnique({
      where: { email },
    });

    if (emailExists) throw new AppError("Email address already used");

    const hashedPassword = await hash(password, 8);

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return user;
  }
}
