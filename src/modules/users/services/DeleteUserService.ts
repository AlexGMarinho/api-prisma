import { prismaClient } from "../../../databases/prismaClient";
import { AppError } from "../../../shared/errors/AppError";

interface IRequest {
  id: string;
}

export class DeleteUserService {
  async execute({ id }: IRequest): Promise<void> {
    const user = await prismaClient.user.findUnique({ where: { id } });

    if (!user) {
      throw new AppError("User not found");
    }

    await prismaClient.user.delete({ where: { id } });
  }
}
