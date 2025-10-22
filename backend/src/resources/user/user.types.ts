import { User } from "../../generated/prisma";

export type CreateUserDto = Pick<User, "name" | "email" >;
export type UserDto = Omit<User, "password">;