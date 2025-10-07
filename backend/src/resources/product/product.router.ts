import { Router } from "express"
import { validate } from ''
import productController from "./product.controller"
import productSchema from "./product.schema";
import checkAuthorization from "../../middlewares/checkAuthorization"

const router = Router()

router.get("/", productController.index)
router.post("/", productController.create)
router.get("/:id", productController.read)
router.put("/:id", productController.update)
router.delete("/:id", productController.remove)

export default router