import { User } from "@prisma/client";
import { AppError } from "../../../shared/errors/AppError";
import { prismaClient } from "../../../databases/prismaClient";

interface IRequest {
  id: string;
}

export class ListPostsUserService {
  async execute({ id }: IRequest): Promise<User> {
    const user = await prismaClient.user.findUnique({ where: { id } });

    if (!user) throw new AppError("User not exist");

    const userPost = await prismaClient.user.findUnique({
      where: { id },
      include: { Post: true },
    });

    if (!userPost) throw new AppError("This user has no posts");

    return userPost;
  }
}
