import { PrismaClient, Product } from "../../generated/prisma"
import { ProductStatus } from "./product.constants"
import { createProductDto, updateProductDto } from "./product.types"

const prisma = new PrismaClient()

export const getProducts = async () => {
    return prisma.product.findMany({
        where: {
            status: ProductStatus.active,
        },
    })
}

export const createProduct = async (product: createProductDto) => {
    return prisma.product.create({ data: product })
}

export const productAlreadyExists = async (name: string) => {
    return prisma.product.findFirst({ where: { name } })
}

export const getProduct = async (id: string): Promise<Product | null> => {
    return prisma.product.findFirst({ where: { id } })
}

export const findProductByName = async (
    name: string,
): Promise<Product | null> => {
    return prisma.product.findFirst({ where: { name } })
}

export const updateProduct = async (product: updateProductDto, id: string) => {
    return prisma.product.update({
        where: {
            id,
        },
        data: product,
    })
}

export const removeProduct = async (id: string) => {
    return prisma.product.delete({ where: { id } })
}
