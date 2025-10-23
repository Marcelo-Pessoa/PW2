import { PrismaClient } from '../../generated/prisma'
import { CreateUserDto, UpdateUserDto } from './user.types'
import bcryptjs from "bcryptjs"
import getEnv from "../../utils/getEnv"

const prisma = new PrismaClient();
const env = getEnv()

export const getAllUsers = async() => {
  return prisma.user.findMany();
}

export const createUser = async( user: CreateUserDto ) => {
  const salt = await bcryptjs.genSalt(env.BCRYPT_ROUNDS);
  user.password = await bcryptjs.hash(user.password, salt);
  
  return prisma.user.create({
    data: user
  })
}

export const updateUser = async( user: UpdateUserDto, id: string ) => {
  return prisma.user.update({
    data: user,
    where: {
      id: id
    }
  })
}

export const findUserByEmail = async( email: string ) => {
  return prisma.user.findFirst({
    where: {
      email: email
    }
  })
}

export const findUserById = async( id: string ) => {
  return prisma.user.findFirst({
    where: {
      id: id
    }
  })
}

export const deleteUsuario = async( id: string ) => {
  return prisma.user.delete({
    where: {
      id: id
    }
  })
}