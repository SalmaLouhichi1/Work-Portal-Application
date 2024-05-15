import express from 'express';
import { createReception, getReceptions, deleteReception } from '../controllers/Receptions.js';

const router = express.Router();

router.get('/receptions', getReceptions);
router.post("/createReception", createReception);
router.delete("/receptions/:id", deleteReception);

export default router;
