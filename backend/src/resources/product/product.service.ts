import { PrismaClient } from "../../generated/prisma"
import { createProductDto, updateProductDto } from "./product.types"

const prisma = new PrismaClient()

export const getProducts = async() => {
    return prisma.product.findMany({
        where: {
            status: 1
        }
    })
}

export const createProduct = async( product: createProductDto ) => {
    return prisma.product.create({
        data: product
    })
}

export const productAlreadyExists = async( name: string ) => {
    return prisma.product.findFirst({
        where: {
            name: name
        }
    })
}

export const getProduct = async( id: string ) => {
    return prisma.product.findFirst({
        where: {
            id: id
        }
    })
}

export const findProductByName = async( name: string ) => {
    return prisma.product.findFirst({
        where: {
            name: name
        }
    })
}

export const updateProduct = async( product: updateProductDto, id: string ) => {
    return prisma.product.update({
        where: {
            id: id
        },
        data : product
    });
}

export const removeProduct = async( id: string ) => {
    return prisma.product.delete({
        where: {
            id: id
        }
    })
}