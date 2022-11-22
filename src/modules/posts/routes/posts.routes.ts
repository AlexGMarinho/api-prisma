import { Router } from "express";
import { PostsController } from "../controllers/PostController";

export const postsRouter = Router();
const postsController = new PostsController();

postsRouter.post("/user/:id", postsController.create);
postsRouter.get("/", postsController.index);
postsRouter.get("/user/:id", postsController.show);
