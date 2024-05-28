import express from 'express';
import { createReception, getReceptions, deleteReception, updateReceptions, getReceptionById } from '../controllers/Receptions.js';
import { checkRole } from '../utils/checkRole.js';
import { authenticateToken } from '../utils/authMiddleware.js';

const router = express.Router();

router.get('/receptions', authenticateToken, getReceptions);
router.post("/createReception", authenticateToken,createReception);
router.delete("/receptions/:id", authenticateToken,deleteReception);
router.put("/receptions/:id", authenticateToken,updateReceptions);
router.get("/receptions/:id", authenticateToken,getReceptionById);

export default router;
