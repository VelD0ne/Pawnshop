import Router from "express";
import * as leaseController from "../controllers/leaseController.js";
const router = Router();

router.get("/lease", leaseController.getLeases);
router.get("/lease/:id", leaseController.getLease);
router.post("/lease", leaseController.addLease);
router.put("/lease", leaseController.updateLease);
router.delete("/lease/:id", leaseController.deleteLease);

export { router as leaseRouter };
