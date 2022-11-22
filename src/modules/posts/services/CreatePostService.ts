import { Post } from "@prisma/client";
import { AppError } from "../../../shared/errors/AppError";
import { prismaClient } from "../../../databases/prismaClient";

interface IRequest {
  id: string;
  content: string;
}

export class CreatePostService {
  async execute({ id, content }: IRequest): Promise<Post> {
    const user = await prismaClient.user.findUnique({ where: { id } });

    if (!user) throw new AppError("User not exist");

    const post = await prismaClient.post.create({
      data: {
        content,
        userId: user.id,
      },
      include: {
        author: true,
      },
    });

    return post;
  }
}
