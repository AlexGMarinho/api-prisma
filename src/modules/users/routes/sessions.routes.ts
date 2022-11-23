import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import { SessionsController } from "../controllers/SessionsController";
import { usersRouter } from "./users.router";

export const sessionsRouter = Router();
const sessionsController = new SessionsController();

usersRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create
);
