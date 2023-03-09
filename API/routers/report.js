import Router from "express";
import * as clientController from "../controllers/reportController.js";
const router = Router();

router.get("/report", clientController.getReport);

export { router as reportRouter };
