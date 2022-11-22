import { Post } from "@prisma/client";
import { AppError } from "../../../shared/errors/AppError";
import { prismaClient } from "../../../databases/prismaClient";

interface IRequest {
  id: string;
}

export class DeletePostService {
  async execute({ id }: IRequest): Promise<Post> {
    const postExist = await prismaClient.post.findUnique({ where: { id } });

    if (!postExist) throw new AppError("Post not exist");

    const post = await prismaClient.post.delete({
      where: {
        id,
      },
    });

    return post;
  }
}
