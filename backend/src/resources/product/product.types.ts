import { Product } from "../../generated/prisma"

export type createProductDto = Pick<
  Product,
  "name" | "price" | "stock" | "description" | "status"
>
export type updateProductDto = Pick<
  Product,
  "name" | "price" | "stock" | "description" | "status"
>
