import Router from "express";
import * as clientController from "../controllers/clientController.js";
const router = Router();

router.get("/client", clientController.getClients);
router.get("/client/:id", clientController.getClient);
router.put("/client", clientController.addClient);
router.post("/client/:id", clientController.updateClient);
router.delete("/client/:id", clientController.deleteClient);

export { router as clientRouter };
