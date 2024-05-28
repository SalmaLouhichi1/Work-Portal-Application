import express from "express";
import { getSales } from "../controllers/sales.js";
import { authenticateToken } from "../utils/authMiddleware.js";
import { checkRole } from "../utils/checkRole.js";

const router = express.Router();

router.get("/sales",authenticateToken, getSales);

export default router;