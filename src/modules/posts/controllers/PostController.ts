import { Request, Response } from "express";
import { CreatePostService } from "../services/CreatePostService";
import { DeletePostService } from "../services/DeletePostService";
import { ListAllPostService } from "../services/ListAllPostService";
import { ListPostsUserService } from "../services/ListPostsUserService";
import { UpdatePostService } from "../services/UpdatePostService";

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
      return res.json(error);
    }
  }

  async index(req: Request, res: Response): Promise<Response> {
    try {
      const listPosts = new ListAllPostService();

      const posts = await listPosts.execute();

      return res.json(posts);
    } catch (error) {
      return res.json(error);
    }
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const listUserPost = new ListPostsUserService();

      const post = await listUserPost.execute({
        id,
      });

      return res.json(post);
    } catch (error) {
      return res.json(error);
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { email, content } = req.body;

    try {
      const uptadePost = new UpdatePostService();

      await uptadePost.execute({
        id,
        email,
        content,
      });

      return res.json({ message: "Updated post" });
    } catch (error) {
      return res.json(error);
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const deleteUserPost = new DeletePostService();

      await deleteUserPost.execute({
        id,
      });

      return res.json({ message: "Deleted Post" });
    } catch (error) {
      return res.json(error);
    }
  }
}
