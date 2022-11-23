import { Request, Response } from "express";
import { CreateSessionsService } from "../services/CreateSessionsService";

export class SessionsController {
  async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    try {
      const createSession = new CreateSessionsService();

      const user = await createSession.execute({
        email,
        password,
      });

      return res.json(user);
    } catch (error) {
      return res.json({ error });
    }
  }
}
