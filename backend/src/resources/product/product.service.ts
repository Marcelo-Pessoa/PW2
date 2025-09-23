import { PrismaClient } from "../../generated/prisma"

const prisma = new PrismaClient()

export const getProducts = async() => {
    return prisma.product.findMany({
        where: {
            status: 1
        }
    })
}

export const createProduct = async(data: { name: string; description: string; stock: number; status: number }) => {
    return prisma.product.create({
        data
    })
}