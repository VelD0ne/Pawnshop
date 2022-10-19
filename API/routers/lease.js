import Router from "express";
import * as leaseController from "../controllers/leaseController.js";
const router = Router();

router.get("/lease", leaseController.getLeases);
router.get("/lease/:id", leaseController.getLease);
router.put("/lease", leaseController.addLease);
router.post("/lease/:id", leaseController.updateLease);
router.delete("/lease/:id", leaseController.deleteLease);

export { router as leaseRouter };
