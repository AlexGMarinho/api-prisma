import { Request, Response } from "express";
import { CreatePostService } from "../services/CreatePostService";

export class PostsController {
  async create(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { content } = req.body;
    try {
      const createPost = new CreatePostService();

      const post = await createPost.execute({
        id,
        content,
      });

      return res.json(post);
    } catch (error) {
      console.log("alo")
      return res.json(error);
    }
  }

  // async index(req: Request, res: Response): Promise<Response> {
  //   async
  // }
}

/*import { prismaClient } from "../../../databases/prismaClient";

export const createPost = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const user = await prismaClient.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      return res.json({ message: "User not exist." });
    }

    const post = await prismaClient.post.create({
      data: {
        content,
        userId: user.id,
      },
      include: {
        author: true,
      },
    });

    return res.json(post);
  } catch (error) {
    return res.json({ message: error.message });
  }
};

export const findAllPost = async (req, res) => {
  try {
    const posts = await prismaClient.post.findMany();

    return res.json(posts);
  } catch (error) {
    return res.json(error);
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const post = await prismaClient.post.findUnique({
      where: { id: Number(id) },
    });

    if (!post) {
      return res.json({ message: "Post not exist" });
    }

    await prismaClient.post.update({
      where: { id: Number(id) },
      data: { content },
    });

    return res.json({ message: "Updated post" });
  } catch (error) {
    return res.json({ error });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await prismaClient.post.findUnique({
      where: { id: Number(id) },
    });

    if (!post) {
      return res.json({ message: "Post not exist" });
    }

    await prismaClient.post.delete({
      where: { id: Number(id) },
    });

    return res.json({ message: "Post deleted" });
  } catch (error) {
    return res.json({ error });
  }
};
/*/
