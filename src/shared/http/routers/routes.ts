import { Router } from "express";
import { usersRouter } from "../../../modules/users/routes/users.router";
import { postsRouter } from "../../../modules/posts/routes/posts.routes";

export const router = Router();

router.use("/users", usersRouter);
router.use("/posts", postsRouter);
