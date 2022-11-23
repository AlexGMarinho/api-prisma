import { User } from "@prisma/client";
import { AppError } from "../../../shared/errors/AppError";
import { prismaClient } from "../../../databases/prismaClient";

interface IRequest {
  id: string;
}

export class ListPostsUserService {
  async execute({ id }: IRequest): Promise<User> {
    const userExist = await prismaClient.user.findUnique({
      where: { id },
      include: {
        Post: { select: { id: true, content: true, created_at: true } },
      },
    });

    if (!userExist) throw new AppError("User not exist");

    return userExist;
  }
}
