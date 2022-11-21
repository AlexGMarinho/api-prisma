import { Post } from "@prisma/client";
import { prismaClient } from "src/databases/prismaClient";

export class ListAllPostService {
  async execute(): Promise<Post[]> {
    const posts = await prismaClient.post.findMany();

    return posts;
  }
}
