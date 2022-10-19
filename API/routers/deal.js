import Router from "express";
import * as dealController from "../controllers/dealController.js";
const router = Router();

router.get("/deal", dealController.getDeals);
router.get("/deal/:id", dealController.getDeal);
router.put("/deal", dealController.addDeal);
router.post("/deal/:id", dealController.updateDeal);
router.delete("/deal/:id", dealController.deleteDeal);

export { router as dealRouter };
