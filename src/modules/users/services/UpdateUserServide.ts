import { User } from "@prisma/client";
import { prismaClient } from "../../../databases/prismaClient";
import { AppError } from "../../../shared/errors/AppError";

interface IRequest {
  id: string;
  name: string;
  email: string;
}

export class UpdateUserService {
  async execute({ id, name, email }: IRequest): Promise<User> {
    const userExist = await prismaClient.user.findUnique({
      where: { id },
    });

    if (!userExist) throw new AppError("User not exist");

    const user = await prismaClient.user.update({
      where: { id },
      data: { name, email },
    });

    return user;
  }
}
