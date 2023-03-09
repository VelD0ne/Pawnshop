import Router from "express";
import * as dealController from "../controllers/dealController.js";
const router = Router();

router.get("/deal", dealController.getDeals);
router.get("/deal/:id", dealController.getDeal);
router.post("/deal", dealController.addDeal);
router.put("/deal", dealController.updateDeal);
router.delete("/deal/:id", dealController.deleteDeal);

export { router as dealRouter };
