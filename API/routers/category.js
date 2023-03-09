import Router from "express";
import * as categoryController from "../controllers/categoryController.js";
const router = Router();

router.get("/category", categoryController.getCategories);
router.get("/category/:id", categoryController.getCategory);
router.post("/category", categoryController.addCategory);
router.put("/category", categoryController.updateCategory);
router.delete("/category/:id", categoryController.deleteCategory);

export { router as categoryRouter };
