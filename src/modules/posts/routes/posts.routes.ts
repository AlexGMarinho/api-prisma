import { Router } from "express";
import { PostsController } from "../controllers/PostController";
import { celebrate, Joi, Segments } from "celebrate";

export const postsRouter = Router();
const postsController = new PostsController();

postsRouter.get("/", postsController.index);

postsRouter.get(
  "/user/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  postsController.show
);

postsRouter.post(
  "/user/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      content: Joi.string().required(),
    },
  }),
  postsController.create
);

postsRouter.put(
  "/user/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      email: Joi.string().required(),
      content: Joi.string().required(),
    },
  }),
  postsController.update
);

postsRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  postsController.delete
);
