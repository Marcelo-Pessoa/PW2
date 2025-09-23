import { Router } from "express"
import productRouter from "../resources/product/product.router"

const router = Router()

// Health check endpoint
router.get("/health", (req, res) => {
  res.json({ status: "OK", message: "API is running" })
})

router.use("/product", productRouter)

export default router