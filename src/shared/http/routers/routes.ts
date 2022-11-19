import { Router } from "express";
import {
  createPost,
  findAllPost,
  updatePost,
} from "../../../modules/posts/controllers/PostController";
import {
  listUser,
  updateUser,
} from "../../../modules/users/controllers/UserController";
import { usersRouter } from "../../../modules/users/routes/users.routes";

export const router = Router();

router.use("/user", usersRouter);
router.use("/users", usersRouter);
router.use("/user/:id", usersRouter)
router.get("/user/:id", listUser);
router.put("/user/:id", updateUser);

router.post("/post/user/:id", createPost);
router.get("/posts", findAllPost);
router.put("/post/:id", updatePost);
