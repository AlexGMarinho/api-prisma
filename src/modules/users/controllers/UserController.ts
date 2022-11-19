import { Request, Response } from "express";
import { prismaClient } from "../../../databases/prismaClient";
import { CreateUserService } from "../services/CreateUserService";
import { DeleteUserService } from "../services/DeleteUserService";
import { ListAllUserService } from "../services/ListAllUserService";

export class UsersController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email } = req.body;

      const createUser = new CreateUserService();

      const user = await createUser.execute({
        name,
        email,
      });

      return res.json(user);
    } catch (error) {
      return res.json(error);
    }
  }

  async index(req: Request, res: Response): Promise<Response> {
    const listUser = new ListAllUserService();

    const users = await listUser.execute();

    return res.json(users);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const deleteUser = new DeleteUserService();

      await deleteUser.execute({
        id: Number(id),
      });

      return res.json({ message: "User Deleted" });
    } catch (error) {
      return res.json({ error });
    }
  }
}

export const listAllUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const users = await prismaClient.user.findMany();

    return res.json(users);
  } catch (error) {
    return res.json(error);
  }
};

export const listUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const user = await prismaClient.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      return res.json({ message: "User not exist" });
    }

    return res.json({ user });
  } catch (error) {
    return res.json({ error });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const user = await prismaClient.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      return res.json({ message: "User not exist" });
    }

    await prismaClient.user.update({
      where: { id: Number(id) },
      data: { name, email },
    });

    return res.json({ message: "Updated User" });
  } catch (error) {
    return res.json({ error });
  }
};
