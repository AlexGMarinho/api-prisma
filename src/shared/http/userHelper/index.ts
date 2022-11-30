import { User } from "@prisma/client";

export type UserResponse = Omit<User, "password">;

export function formatUserResponse(user: User) {
  const { password: _password, ...userRest } = user;

  return userRest;
}
