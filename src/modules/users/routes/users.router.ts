import { Router } from "express";
import { UsersController } from "../controllers/UsersController";
import { celebrate, Joi, Segments } from "celebrate";
import { isAuthenticated } from "../middlewares/isAuthenticated";

export const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get("/", isAuthenticated, usersController.index);

usersRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create
);

usersRouter.put(
  "/:id",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.update
);

usersRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  usersController.delete
);
