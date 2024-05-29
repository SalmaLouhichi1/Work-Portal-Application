import express from 'express';
import { createReception, getReceptions, deleteReception, updateReceptions, getReceptionById } from '../controllers/Receptions.js';
import { checkRole } from '../utils/checkRole.js';
import { authenticateToken } from '../utils/authMiddleware.js';

const router = express.Router();

router.get('/receptions', authenticateToken,checkRole(['TLS admin']), getReceptions);
router.post("/createReception",checkRole(['TLS admin']), authenticateToken,createReception);
router.delete("/receptions/:id",checkRole(['TLS admin']), authenticateToken,deleteReception);
router.put("/receptions/:id", checkRole(['TLS admin']),authenticateToken,updateReceptions);
router.get("/receptions/:id",checkRole(['TLS admin']), authenticateToken,getReceptionById);

export default router;
