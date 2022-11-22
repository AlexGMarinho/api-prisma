import { Post } from "@prisma/client";
import { AppError } from "../../../shared/errors/AppError";
import { prismaClient } from "../../../databases/prismaClient";

interface IRequest {
  id: string;
  email: string;
  content: string;
}

export class UpdatePostService {
  async execute({ id, email, content }: IRequest): Promise<Post> {
    const emailExist = await prismaClient.user.findUnique({ where: { email } });

    if (!emailExist) throw new AppError("Email not exist");

    const postExist = await prismaClient.post.findUnique({ where: { id } });

    if (!postExist) throw new AppError("Post not exist");

    const post = await prismaClient.post.update({
      where: { id },
      data: { content },
    });

    return post;
  }
}
