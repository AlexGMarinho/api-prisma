import { Router } from "express";
import { UsersController } from "../controllers/UserController";

export const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get("/", usersController.index);
usersRouter.post("/", usersController.create);
