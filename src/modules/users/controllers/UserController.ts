import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";
import { DeleteUserService } from "../services/DeleteUserService";
import { ListAllUserService } from "../services/ListAllUserService";
import { UpdateUserService } from "../services/UpdateUserServide";

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
    const listUsers = new ListAllUserService();

    const users = await listUsers.execute();

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

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { name, email } = req.body;

      const updateUser = new UpdateUserService();

      await updateUser.execute({
        id,
        email,
        name,
      });

      return res.json({ message: "Updated User" });
    } catch (error) {
      return res.json({ error });
    }
  }
}
