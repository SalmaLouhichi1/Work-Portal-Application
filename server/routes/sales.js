import express from "express";
import { getSales } from "../controllers/sales.js";
import { authenticateToken } from "../utils/authMiddleware.js";

const router = express.Router();

router.get("/sales",authenticateToken, getSales);

export default router;