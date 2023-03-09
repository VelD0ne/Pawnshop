import Router from "express";
import * as categoryController from "../controllers/viewController.js";
const router = Router();

router.get("/view/all", categoryController.getAllTables);

export { router as viewRouter };
