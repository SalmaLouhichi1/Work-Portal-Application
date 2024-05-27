import express from 'express';
import { createReception, getReceptions, deleteReception, updateReceptions, getReceptionById } from '../controllers/Receptions.js';

const router = express.Router();

router.get('/receptions', getReceptions);
router.post("/createReception", createReception);
router.delete("/receptions/:id", deleteReception);
router.put("/receptions/:id", updateReceptions);
router.get("/receptions/:id", getReceptionById);

export default router;
