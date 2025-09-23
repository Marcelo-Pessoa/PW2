import { Router } from "express"
import productRouter from "../resources/product/product.router"
import languageRouter from "../resources/language/language.router"

const router = Router()

// Health check endpoint
router.use("/product", productRouter)
router.use("/language", languageRouter)

export default router