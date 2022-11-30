import { Router } from "express";
import { usersRouter } from "../../../modules/users/routes/users.router";
import { postsRouter } from "../../../modules/posts/routes/posts.routes";
import { sessionsRouter } from "../../../modules/users/routes/sessions.routes";

export const router = Router();

router.use("/user", usersRouter);
router.use("/post", postsRouter);
router.use("/sessions", sessionsRouter);
