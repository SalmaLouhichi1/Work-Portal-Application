import express from "express";
import {
  getTransactions,
  getGeography,
} from "../controllers/client.js";

const router = express.Router();

router.get("/transactions", getTransactions);
router.get("/geography", getGeography);

export default router;