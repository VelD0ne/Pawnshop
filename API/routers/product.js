import Router from "express";
import * as productController from "../controllers/productController.js";
const router = Router();

router.get("/product", productController.getProducts);
router.get("/product/:id", productController.getProduct);
router.post("/product", productController.addProduct);
router.put("/product", productController.updateProduct);
router.delete("/product/:id", productController.deleteProduct);

export { router as productRouter };
