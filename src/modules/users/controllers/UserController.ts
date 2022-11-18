import { Request, Response } from "express";
import { prismaClient } from "../../../databases/prismaClient";
import { CreateUserService } from "../services/CreateUserService";
import { ListUserService } from "../services/ListUserService";

export class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
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

  public async index(req: Request, res: Response): Promise<Response> {
    const listUser = new ListUserService();

    const users = await listUser.execute();

    return res.json(users);
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

export const deletePost = async (
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

    await prismaClient.user.delete({
      where: { id: Number(id) },
    });

    return res.json({ message: "Deleted post" });
  } catch (error) {
    return res.json({ error });
  }
};
