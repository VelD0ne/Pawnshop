import express from "express";
import { clientRouter } from "./client.js";
import { productRouter } from "./product.js";
import { dealRouter } from "./deal.js";
import { leaseRouter } from "./lease.js";
import { categoryRouter } from "./category.js";

const router = express.Router();

router.use(clientRouter);
router.use(leaseRouter);
router.use(dealRouter);
router.use(productRouter);
router.use(categoryRouter);

export { router };
