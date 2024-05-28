import express from "express";
import {
  getTransactions,
  getGeography,
} from "../controllers/client.js";
import { checkRole } from "../utils/checkRole.js";

const router = express.Router();

router.get("/transactions", authenticateToken,checkRole('TLS admin') ,getTransactions);
router.get("/geography", authenticateToken,checkRole('TLS admin') ,getGeography);

export default router;