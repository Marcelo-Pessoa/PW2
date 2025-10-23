import { PrismaClient } from "../../generated/prisma";
import { UserTypes } from "../userType/userType.constants";
import { LoginDto } from "./auth.types";
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export const checkCredentials = async(data: LoginDto) => {
  const user = await prisma.user.findFirst({
    where: {
      email: data.email
    } 
  });

  if (!user) return null

  const ok = await bcrypt.compare(data.password, user.password)
  if(ok) return user;
  return null;
}