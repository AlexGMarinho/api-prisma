import { User } from "@prisma/client";
import { prismaClient } from "../../../databases/prismaClient";

export class ListUserService {
  public async execute(): Promise<User[]> {
    const users = await prismaClient.user.findMany();

    return users;
  }
}
