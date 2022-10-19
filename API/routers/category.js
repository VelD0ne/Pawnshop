import Router from "express";
import * as categoryController from "../controllers/categoryController.js";
const router = Router();

router.get("/category", categoryController.getCategories);
router.get("/category/:id", categoryController.getCategory);
router.put("/category", categoryController.addCategory);
router.post("/category/:id", categoryController.updateCategory);
router.delete("/category/:id", categoryController.deleteCategory);

export { router as categoryRouter };
